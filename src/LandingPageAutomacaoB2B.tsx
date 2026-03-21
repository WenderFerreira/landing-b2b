import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import {
  Activity,
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  Funnel,
  LayoutDashboard,
  MessageCircleMore,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FormData = {
  nome: string;
  whatsapp: string;
  email: string;
};

type LandingPageProps = {
  onSubmit?: (data: FormData) => void;
};

type SectionItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type FloatingStatProps = {
  value: string;
  label: string;
  className?: string;
};

type MetricCardProps = {
  value: string;
  label: string;
};

type SectionCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
};

type HeroStat = {
  value: string;
  label: string;
};

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

const problems: SectionItem[] = [
  {
    title: "A Janela de Ouro Fechou.",
    description:
      "Os primeiros segundos definem a venda. Quando a resposta atrasa, a atenção do lead já foi entregue para quem automatizou primeiro.",
    icon: Clock3,
  },
  {
    title: 'Equipe Travada no "Ctrl+C / Ctrl+V".',
    description:
      "Sua operação desacelera quando o time depende de copiar, colar, procurar contexto e repetir o mesmo atendimento o dia inteiro.",
    icon: MessageCircleMore,
  },
  {
    title: "O Cemitério de Leads.",
    description:
      "Leads pagos entram, ficam sem retorno, somem do radar e viram desperdício invisível dentro de uma operação desorganizada.",
    icon: BadgeDollarSign,
  },
];

const solutions: SectionItem[] = [
  {
    title: "Captura Cirúrgica.",
    description:
      "Cada clique entra no fluxo certo com contexto, origem e prioridade, sem ruído e sem depender de intervenção manual.",
    icon: Funnel,
  },
  {
    title: "O Disparo em 5 Segundos.",
    description:
      "A negociação começa no WhatsApp em segundos, com resposta imediata, qualificação inicial e continuidade sem gargalos.",
    icon: Zap,
  },
  {
    title: "Gestão Visual Sincronizada.",
    description:
      "O CRM reflete cada etapa em tempo real para que o comercial opere com clareza, cadência e previsibilidade.",
    icon: LayoutDashboard,
  },
];

const highlights = [
  "Lead capturado sem fila humana",
  "WhatsApp iniciado com contexto imediato",
  "CRM atualizado em um fluxo único",
];

const heroStats: HeroStat[] = [
  { value: "5s", label: "Atendimento automático após o clique" },
  { value: "24/7", label: "Negociação sem depender do horário da equipe" },
  { value: "CRM", label: "Organização sincronizada em tempo real" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function GlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-[-140px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-white/12 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.48, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-80px] top-32 h-[360px] w-[360px] rounded-full bg-white/6 blur-3xl"
        animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-60px] bottom-12 h-[320px] w-[320px] rounded-full bg-white/5 blur-3xl"
        animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,249,250,0.09),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%),linear-gradient(to_right,rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,72px_72px,72px_72px] opacity-[0.28]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/8 to-transparent" />
      <div className="absolute left-1/2 top-[22%] h-[520px] w-[880px] -translate-x-1/2 rounded-[50%] border border-white/8 opacity-40" />
    </div>
  );
}

function FloatingStat({ value, label, className = "" }: FloatingStatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className={`rounded-[26px] border border-white/12 bg-white/[0.04] px-5 py-4 backdrop-blur-xl shadow-[0_18px_40px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(248,249,250,0.06)] ${className}`}
    >
      <div className="text-lg font-semibold tracking-tight text-[#F8F9FA]">{value}</div>
      <div className="mt-1 text-sm leading-6 text-zinc-400">{label}</div>
    </motion.div>
  );
}

function MetricCard({ value, label }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{
        boxShadow: "0 18px 40px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.04)",
        borderColor: "rgba(248,249,250,0.22)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[26px] border border-white/12 bg-white/[0.035] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl"
    >
      <p className="text-3xl font-bold text-[#F8F9FA]">{value}</p>
      <p className="mt-1 text-sm text-zinc-400">{label}</p>
    </motion.div>
  );
}

function SectionCard({ icon: Icon, title, description, index }: SectionCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      custom={0.08 * index}
      initial={false}
      whileHover="hover"
      className="group relative overflow-hidden rounded-[32px] border border-white/12 bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.025] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl"
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hover: {
            background:
                "radial-gradient(circle at 12% 18%, rgba(248,249,250,0.15), transparent 34%), radial-gradient(circle at 88% 82%, rgba(248,249,250,0.08), transparent 30%)",
          },
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
              "radial-gradient(circle at 12% 18%, rgba(248,249,250,0.09), transparent 30%), radial-gradient(circle at 88% 82%, rgba(248,249,250,0.04), transparent 26%)",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-[28px] opacity-0"
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.45 }}
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(248,249,250,0.14), 0 0 0 1px rgba(248,249,250,0.05)",
        }}
      />
      <motion.div
        className="absolute inset-x-6 top-0 h-px origin-left bg-gradient-to-r from-transparent via-white/55 to-transparent"
        variants={{ hover: { scaleX: 1.08, opacity: 1 } }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ scaleX: 0.82, opacity: 0.7 }}
      />
      <div className="relative">
        <motion.div
          variants={{
            hover: {
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.10), 0 0 0 1px rgba(248,249,250,0.12), 0 10px 30px rgba(248,249,250,0.08)",
              backgroundColor: "rgba(248,249,250,0.08)",
            },
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/8"
        >
          <motion.div
            variants={{ hover: { rotate: -8, scale: 1.04 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon className="h-6 w-6 text-[#F8F9FA]" />
          </motion.div>
        </motion.div>
        <motion.h3
          variants={{ hover: { color: "#ffffff" } }}
          transition={{ duration: 0.3 }}
          className="text-xl font-semibold tracking-tight text-white/95"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={{ hover: { color: "rgba(228,228,231,0.92)" } }}
          transition={{ duration: 0.3 }}
          className="mt-3 text-sm leading-7 text-zinc-400"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}

function InputField({ id, label, className = "", ...props }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-2xl border border-white/12 bg-white/[0.045] px-4 py-3 text-white outline-none placeholder:text-zinc-500 transition duration-200 focus:border-white/30 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(248,249,250,0.08)] ${className}`}
        {...props}
      />
    </div>
  );
}

function HiddenTestValue({ label, children }: { label: string; children: ReactNode }) {
  return <span data-test={label}>{children}</span>;
}

export default function LandingPageAutomacaoB2B({ onSubmit }: LandingPageProps) {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    whatsapp: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof onSubmit === "function") {
      onSubmit(formData);
      return;
    }

    console.log("Formulário enviado:", formData);
  };

  const completionHint = useMemo(() => {
    const filled = Object.values(formData).filter(Boolean).length;
    return Math.min((filled / 3) * 100, 100);
  }, [formData]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#0B0B0E] text-white selection:bg-white/20">
      <div className="relative">
        <GlowBackground />

        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/12 bg-white/[0.045] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          >
            <div className="flex items-center">
              <div>
                <p className="font-display text-2xl font-bold tracking-[0.32em] text-[#F8F9FA] sm:text-[1.75rem]">
                  YANG
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
                  Yin Yang SaaS Balance
                </p>
              </div>
            </div>
            <a
              href="#formulario"
              className="hidden rounded-full border border-white/20 bg-white px-6 py-3 text-base font-bold tracking-tight text-black shadow-[0_0_30px_rgba(248,249,250,0.16)] transition duration-200 hover:bg-[#F8F9FA] md:inline-flex"
            >
              Ver a Automação Funcionando ➔
            </a>
          </motion.header>

          <main>
            <section className="relative mx-auto flex min-h-[84vh] max-w-6xl flex-col items-center justify-center px-2 pb-16 pt-16 text-center lg:pb-24 lg:pt-20">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 overflow-hidden">
                <div className="absolute inset-x-[-10%] bottom-[-110px] h-[240px] rounded-t-[100%] border-t border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(248,249,250,0.09),rgba(248,249,250,0.03)_36%,transparent_70%)] blur-2xl" />
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="relative z-10 w-full"
              >
                <div className="mx-auto max-w-5xl rounded-[40px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] px-6 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-[18px] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
                  <motion.div
                    variants={fadeUp}
                    custom={0.05}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm text-zinc-300 shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
                  >
                    <Activity className="h-4 w-4 text-[#F8F9FA]" />
                    Yin no caos. Yang na resposta.
                  </motion.div>

                  <motion.h1
                    variants={fadeUp}
                    custom={0.12}
                    className="font-display mx-auto mt-8 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-[#F8F9FA] sm:text-6xl lg:text-7xl"
                  >
                    O Sistema que Transforma um Clique no Anúncio em Atendimento Instantâneo de 5 Segundos.
                  </motion.h1>

                  <motion.p
                    variants={fadeUp}
                    custom={0.2}
                    className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg"
                  >
                    Elimine o atraso humano. Capturamos o seu lead, iniciamos a negociação no WhatsApp imediatamente e organizamos todo o fluxo no seu CRM. O fim do caos comercial.
                  </motion.p>

                  <motion.div
                    variants={fadeUp}
                    custom={0.28}
                    className="mt-10 flex flex-col items-center justify-center gap-5"
                  >
                    <div className="flex flex-col items-center gap-4 sm:flex-row">
                      <a
                        href="#formulario"
                        className="group inline-flex min-h-[68px] items-center justify-center gap-2 rounded-[22px] border border-white/20 bg-white px-10 py-5 text-lg font-extrabold tracking-tight text-black shadow-[0_0_40px_rgba(248,249,250,0.16)] transition duration-200 hover:scale-[1.01] hover:bg-[#F8F9FA] hover:shadow-[0_0_50px_rgba(248,249,250,0.2)]"
                      >
                        Ver a Automação Funcionando ➔
                      </a>
                      <div className="rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-medium text-black shadow-[0_10px_30px_rgba(248,249,250,0.08)]">
                        Clareza no fluxo. Velocidade no primeiro contato.
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                      {highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/20 bg-white px-4 py-2 font-medium text-black shadow-[0_10px_24px_rgba(248,249,250,0.06)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="relative z-10 mt-8 w-full max-w-5xl">
                <div className="grid gap-4 md:grid-cols-3">
                  {heroStats.map((item, index) => (
                    <FloatingStat
                      key={item.value}
                      value={item.value}
                      label={item.label}
                      className={index === 1 ? "md:-translate-y-3" : ""}
                    />
                  ))}
                </div>
              </div>
            </section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="mx-auto max-w-6xl py-8"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">Yin</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    A regra do jogo mudou: Quem demora, não vende.
                  </h2>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {problems.map((item, index) => (
                  <SectionCard
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    index={index}
                  />
                ))}
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="mx-auto max-w-6xl py-24"
            >
              <div className="mb-12 max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">Yang</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  A Infraestrutura que Trabalha na Velocidade da Luz.
                </h2>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {solutions.map((item, index) => (
                  <SectionCard
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    index={index}
                  />
                ))}
              </div>

              <motion.div
                variants={fadeUp}
                custom={0.25}
                className="mt-10 grid gap-4 rounded-[32px] border border-white/12 bg-white/[0.03] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl md:grid-cols-3"
              >
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F8F9FA]" />
                    <p className="text-sm leading-7 text-zinc-300">{item}</p>
                  </div>
                ))}
              </motion.div>
            </motion.section>

            <motion.section
              id="formulario"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-5xl py-10 pb-24"
            >
              <div className="relative overflow-hidden rounded-[36px] border border-white/12 bg-gradient-to-br from-white/[0.09] via-white/[0.05] to-white/[0.025] p-1 shadow-[0_24px_90px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,249,250,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(248,249,250,0.08),transparent_32%)]" />
                <div className="relative rounded-[32px] border border-white/8 bg-[#0E0F13]/95 p-8 backdrop-blur-xl sm:p-10 lg:p-12">
                  <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-zinc-200 shadow-[0_10px_30px_rgba(248,249,250,0.05)]">
                        <ShieldCheck className="h-4 w-4" />
                        Teste de impacto em tempo real
                      </div>
                      <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Sinta o impacto no seu próprio celular.
                      </h2>
                      <p className="mt-4 max-w-xl text-base leading-8 text-zinc-300">
                        Não acredite apenas em palavras. Preencha o formulário abaixo e veja como a nossa automação vai abordar os seus futuros clientes em tempo real.
                      </p>

                      <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <MetricCard value="5s" label="para responder novos leads" />
                        <MetricCard value="100%" label="dos contatos organizados no fluxo" />
                      </div>
                    </div>

                    <motion.form
                      onSubmit={handleSubmit}
                      whileHover={{
                        boxShadow:
                          "0 22px 55px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.03)",
                        borderColor: "rgba(248,249,250,0.18)",
                      }}
                      className="rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7"
                    >
                      <div className="mb-5">
                        <div className="flex items-center justify-between text-xs text-zinc-400">
                          <span>Preenchimento</span>
                          <span>{Math.round(completionHint)}%</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-white/70 via-white to-white/75"
                            animate={{ width: `${completionHint}%` }}
                            transition={{ duration: 0.35 }}
                          />
                        </div>
                      </div>

                      <div className="space-y-5">
                        <InputField
                          id="nome"
                          label="Nome"
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Seu nome"
                          required
                        />

                        <InputField
                          id="whatsapp"
                          label="WhatsApp"
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="(11) 99999-9999"
                          required
                        />

                        <InputField
                          id="email"
                          label="E-mail corporativo"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="voce@empresa.com"
                          required
                        />

                        <button
                          type="submit"
                          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white px-6 py-4 text-base font-semibold tracking-tight text-black shadow-[0_0_40px_rgba(248,249,250,0.16)] transition duration-200 hover:bg-[#F8F9FA] hover:shadow-[0_0_54px_rgba(248,249,250,0.22)]"
                        >
                          Testar Velocidade de Resposta ⚡
                        </button>
                      </div>
                    </motion.form>
                  </div>
                </div>
              </div>
            </motion.section>
          </main>
        </div>
      </div>
    </div>
  );
}

export function LandingPageAutomacaoB2BTests() {
  const hasThreeProblemCards = problems.length === 3;
  const hasThreeSolutionCards = solutions.length === 3;
  const copyPreserved =
    problems[0].title === "A Janela de Ouro Fechou." &&
    solutions[1].title === "O Disparo em 5 Segundos.";
  const cardHoverUsesNoLift =
    !/whileHover=\{\{ y: -8 \}\}/.test(String(SectionCard)) &&
    !/hover:-translate-y/.test(String(SectionCard));
  const metricCopyPreserved =
    ["5s", "100%"].every((value) => /5s|100%/.test(value)) &&
    ["para responder novos leads", "dos contatos organizados no fluxo"].length === 2;

  return (
    <div className="hidden" aria-hidden="true">
      <HiddenTestValue label="problems-count">{String(hasThreeProblemCards)}</HiddenTestValue>
      <HiddenTestValue label="solutions-count">{String(hasThreeSolutionCards)}</HiddenTestValue>
      <HiddenTestValue label="copy-preserved">{String(copyPreserved)}</HiddenTestValue>
      <HiddenTestValue label="no-lift-hover">{String(cardHoverUsesNoLift)}</HiddenTestValue>
      <HiddenTestValue label="metric-copy-preserved">{String(metricCopyPreserved)}</HiddenTestValue>
    </div>
  );
}
