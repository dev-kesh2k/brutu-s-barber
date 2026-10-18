// Idempotente: roda a cada publicação. Cria o admin inicial e o catálogo inicial da barbearia
// (barbeiros e serviços) só quando ainda não existem; depois tudo é editado pelo painel.
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ARTISTS = [
  { name: 'Bruno Brutus', style: 'Degradê e navalha', years: 12, bio: 'Fundador da casa. Degradê, navalhado e acabamento na régua.', services: ['Corte masculino', 'Corte + barba', 'Barba', 'Pigmentação'] },
  { name: 'Diego Ramos', style: 'Barba e visagismo', years: 8, bio: 'Barba desenhada com toalha quente e visagismo.', services: ['Barba', 'Corte + barba', 'Sobrancelha'] },
  { name: 'Caio Mendes', style: 'Cortes clássicos', years: 6, bio: 'Social, tesoura e cortes clássicos para todas as idades.', services: ['Corte masculino', 'Corte infantil', 'Sobrancelha'] },
];

const SERVICES = [
  { name: 'Corte masculino', description: 'Corte na máquina e tesoura com acabamento.', priceCents: 4500, durationMin: 40, icon: 'pen' },
  { name: 'Barba', description: 'Barba com toalha quente, navalha e balm.', priceCents: 3500, durationMin: 30, icon: 'diamond' },
  { name: 'Corte + barba', description: 'O combo completo da casa.', priceCents: 7000, durationMin: 70, icon: 'eye' },
  { name: 'Corte infantil', description: 'Corte para crianças até 12 anos.', priceCents: 3500, durationMin: 30, icon: 'refresh' },
  { name: 'Pigmentação', description: 'Pigmentação de barba ou cabelo.', priceCents: 4000, durationMin: 30, icon: 'ring' },
  { name: 'Sobrancelha', description: 'Limpeza e alinhamento na navalha.', priceCents: 1500, durationMin: 15, icon: 'chat' },
];

async function main() {
  const email = (process.env.SEED_ADMIN_EMAIL || 'admin@example.com').trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME || 'Administrador';
  if (!password) throw new Error('SEED_ADMIN_PASSWORD não definido');

  if ((await prisma.user.count({ where: { role: 'admin' } })) === 0) {
    await prisma.user.upsert({
      where: { email },
      update: { role: 'admin' },
      create: { email, name, role: 'admin', passwordHash: await bcrypt.hash(password, 10) },
    });
    console.log(`Admin criado: ${email}`);
  }

  if ((await prisma.service.count()) === 0 && (await prisma.artist.count()) === 0) {
    const ids = {};
    for (const [i, s] of SERVICES.entries()) {
      const created = await prisma.service.create({ data: { ...s, active: s.active !== false, sortOrder: i } });
      ids[s.name] = created.id;
    }
    for (const [i, a] of ARTISTS.entries()) {
      const { services, ...data } = a;
      await prisma.artist.create({
        data: { ...data, sortOrder: i, services: { connect: services.map((n) => ({ id: ids[n] })) } },
      });
    }
    console.log('Catálogo inicial criado');
  }

  await prisma.setting.upsert({ where: { key: 'studioName' }, update: {}, create: { key: 'studioName', value: "Brutu\'s Barber" } });
  await prisma.setting.upsert({ where: { key: 'depositCents' }, update: {}, create: { key: 'depositCents', value: '2000' } });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
