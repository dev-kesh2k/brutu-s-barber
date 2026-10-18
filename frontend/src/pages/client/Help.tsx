import { AtSign, ChevronDown, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useConfig } from '../../config';
import { PageHead } from '../../ui';
import { brl, waLink } from '../../util';

export default function Help() {
  const config = useConfig();
  const deposit = config ? brl(config.depositCents) : 'o sinal';
  const FAQ = [
    ...(config?.depositCents
      ? [{ q: 'Como funciona o sinal?', a: `Para garantir o horário você paga ${deposit} de sinal, que é descontado do valor final do atendimento. Se preferir, escolha "Pagar na barbearia": a solicitação passa pela aprovação da equipe.` }]
      : []),
    { q: 'O preço é fechado?', a: 'Os valores são "a partir de". Desenhos, pigmentação ou cabelo muito comprido podem mudar o valor, que é combinado com o barbeiro.' },
    { q: 'Como vejo meus agendamentos?', a: 'Não precisa de cadastro: em Agenda, informe o mesmo celular usado no agendamento. Ele fica salvo neste aparelho para as próximas vezes.' },
    { q: 'Posso cancelar ou remarcar?', a: 'Sim. Em Agenda, abra o agendamento e toque em "Cancelar". Se o sinal já foi pago, combine a remarcação com a barbearia.' },
    { q: 'Preciso levar algo?', a: 'Só chegar 10 minutos antes. Se quiser um corte específico, leve uma foto de referência. Crianças com responsável.' },
    { q: 'Como mostro o corte que quero?', a: 'Anexe imagens no agendamento (na etapa de detalhes ou depois, abrindo o agendamento em Agenda) e descreva a ideia no campo de detalhes.' },
  ];

  return (
    <div className="mx-auto max-w-2xl">
      <PageHead back="/perfil" title="Ajuda e suporte" />
      <div className="flex flex-col gap-3">
        {FAQ.map((f) => (
          <details key={f.q} className="card group p-0">
            <summary className="flex min-h-[60px] cursor-pointer list-none items-center gap-3 px-5 text-base font-bold">
              <span className="min-w-0 flex-1">{f.q}</span>
              <ChevronDown size={20} className="shrink-0 text-soft transition group-open:rotate-180" />
            </summary>
            <p className="px-5 pb-5 text-soft">{f.a}</p>
          </details>
        ))}
      </div>

      <h2 className="h2 mb-3 mt-8">Fale com a barbearia</h2>
      <div className="flex flex-col gap-3">
        {config?.whatsapp && (
          <a href={waLink(config.whatsapp)} target="_blank" rel="noreferrer" className="btn-primary">
            <MessageCircle size={20} /> WhatsApp
          </a>
        )}
        {config?.phone && (
          <a href={`tel:${config.phone.replace(/[^\d+]/g, '')}`} className="btn-secondary">
            <Phone size={20} /> {config.phone}
          </a>
        )}
        {config?.instagram && (
          <a href={`https://instagram.com/${config.instagram}`} target="_blank" rel="noreferrer" className="btn-secondary">
            <AtSign size={20} /> @{config.instagram}
          </a>
        )}
        {config?.address && (
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.address)}`} target="_blank" rel="noreferrer" className="card flex items-start gap-3 p-4">
            <MapPin size={20} className="mt-0.5 shrink-0 text-accent" />
            <span className="min-w-0 break-words text-soft">{config.address}</span>
          </a>
        )}
        {config && !config.whatsapp && !config.phone && !config.instagram && !config.address && (
          <p className="text-muted">Os contatos da barbearia ainda não foram cadastrados. Procure a recepção.</p>
        )}
      </div>
    </div>
  );
}
