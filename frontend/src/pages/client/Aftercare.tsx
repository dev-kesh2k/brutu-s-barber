import { Ban, Droplet, Hand, ShieldCheck, Sun, Timer } from 'lucide-react';
import { PageHead } from '../../ui';

const STEPS = [
  { icon: Timer, title: 'Entre um corte e outro', text: 'Para manter o degradê alinhado, volte a cada 2 a 3 semanas. O corte social aguenta de 3 a 4 semanas.' },
  { icon: Droplet, title: 'Lavagem', text: 'Lave o cabelo com shampoo adequado ao seu tipo de fio e água morna. Água muito quente resseca o couro cabeludo.' },
  { icon: Hand, title: 'Barba hidratada', text: 'Use óleo ou balm para barba todo dia, depois do banho. Penteie no sentido dos fios para evitar falhas.' },
  { icon: Ban, title: 'Não raspe em casa', text: 'Evite mexer no contorno com lâmina em casa: o desenho perde a linha e fica difícil acertar no próximo atendimento.' },
  { icon: Sun, title: 'Depois da navalha', text: 'Evite sol forte e produtos com álcool nas primeiras 24 horas após a navalha para não irritar a pele.' },
  { icon: ShieldCheck, title: 'Irritação ou foliculite', text: 'Vermelhidão, coceira ou bolinhas que não somem em 2 dias: fale com a barbearia e, se piorar, procure um dermatologista.' },
];

export default function Aftercare() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHead back="/perfil" title="Cuidados com cabelo e barba" subtitle="Dicas para o visual durar mais." />
      <ol className="flex flex-col gap-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="card flex gap-4 p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tint2 text-accent">
              <s.icon size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-lg font-bold">
                {i + 1}. {s.title}
              </p>
              <p className="mt-1 text-soft">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
