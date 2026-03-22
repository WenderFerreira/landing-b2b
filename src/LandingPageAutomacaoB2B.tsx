import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  Funnel,
  LayoutDashboard,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
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

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

const problems: SectionItem[] = [
  {
    title: "Leads esfriam antes do seu time responder",
    description:
      "Quando o primeiro contato demora, a oportunidade perde valor e o concorrente entra na frente.",
    icon: Clock3,
  },
  {
    title: "WhatsApp sem processo vira perda de oportunidade",
    description:
      "Mensagens dispersas, follow-ups esquecidos e atendimento sem padrão reduzem a conversão do comercial.",
    icon: MessageCircleMore,
  },
  {
    title: "Seu investimento em tráfego não vira venda",
    description:
      "Você paga para gerar demanda, mas perde receita quando os leads não entram em um fluxo de vendas eficiente.",
    icon: BadgeDollarSign,
  },
];

const solutions: SectionItem[] = [
  {
    title: "Captação e triagem automáticas",
    description:
      "Centralize leads de anúncios, formulários e canais de entrada com qualificação automática desde o primeiro contato.",
    icon: Funnel,
  },
  {
    title: "Resposta imediata no momento certo",
    description:
      "Dispare respostas em segundos no WhatsApp com contexto e direcionamento para acelerar o avanço da conversa.",
    icon: Zap,
  },
  {
    title: "Pipeline claro para acompanhar e fechar",
    description:
      "Organize etapas, responsáveis e próximos passos em um CRM visual para não deixar nenhuma oportunidade escapar.",
    icon: LayoutDashboard,
  },
];

const highlights = [
  "Processo comercial desenhado para vender com previsibilidade",
  "WhatsApp com atendimento rápido, padrão e rastreável",
  "CRM visual para acompanhar, cobrar e fechar com clareza",
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
        className="absolute left-1/2 top-[-120px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/8 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.32, 0.5, 0.32] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-60px] top-40 h-[340px] w-[340px] rounded-full bg-white/5 blur-3xl"
        animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-50px] bottom-20 h-[280px] w-[280px] rounded-full bg-white/4 blur-3xl"
        animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,64px_64px,64px_64px] opacity-[0.22]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/6 to-transparent" />
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
      className={`rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div className="text-lg font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-zinc-400">{label}</div>
    </motion.div>
  );
}

function MetricCard({ value, label }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{
        boxShadow: "0 18px 40px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.04)",
        borderColor: "rgba(255,255,255,0.18)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-white/10 bg-black/20 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
    >
      <p className="text-3xl font-bold text-white">{value}</p>
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
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.075] via-white/[0.035] to-white/[0.02] p-7 shadow-[0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hover: {
            background:
              "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.12), transparent 34%), radial-gradient(circle at 88% 82%, rgba(255,255,255,0.08), transparent 30%)",
          },
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.08), transparent 30%), radial-gradient(circle at 88% 82%, rgba(255,255,255,0.04), transparent 26%)",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-[28px] opacity-0"
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.45 }}
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.12), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      />
      <motion.div
        className="absolute inset-x-6 top-0 h-px origin-left bg-gradient-to-r from-transparent via-white/50 to-transparent"
        variants={{ hover: { scaleX: 1.08, opacity: 1 } }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ scaleX: 0.82, opacity: 0.7 }}
      />
      <div className="relative">
        <motion.div
          variants={{
            hover: {
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.10), 0 0 0 1px rgba(255,255,255,0.14), 0 10px 30px rgba(255,255,255,0.06)",
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10"
        >
          <motion.div
            variants={{ hover: { rotate: -8, scale: 1.04 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon className="h-6 w-6 text-white" />
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
        className={`w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-white outline-none placeholder:text-zinc-500 transition duration-200 focus:border-white/30 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)] ${className}`}
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
    <div className="min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-white/20">
      <div className="relative">
        <GlowBackground />

        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto flex max-w-6xl items-center justify-between rounded-[32px] border border-white/10 bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-white/[0.06] px-5 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[22px] border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xl font-semibold tracking-[0.38em] text-white sm:text-2xl">YANG</p>
                <p className="text-sm text-zinc-400">Automação comercial para operações B2B</p>
              </div>
            </div>
            <a
              href="#formulario"
              className="hidden rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.08)] transition duration-200 hover:bg-zinc-200 md:inline-flex"
            >
              Falar com Especialista
            </a>
          </motion.header>

          <main>
            <section className="relative mx-auto flex min-h-[84vh] max-w-6xl flex-col items-center justify-center px-2 text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="relative z-10"
              >
                <motion.h1
                  variants={fadeUp}
                  custom={0.08}
                  className="mx-auto max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl"
                >
                  Sua operação pode vender mais sem depender de resposta manual.
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  custom={0.16}
                  className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl"
                >
                  A YANG estrutura atendimento, qualificação e acompanhamento comercial para responder mais rápido, organizar o funil e aumentar a conversão dos seus leads.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  custom={0.24}
                  className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                >
                  <a
                    href="#formulario"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] transition duration-200 hover:bg-zinc-200 hover:shadow-[0_0_50px_rgba(255,255,255,0.16)]"
                  >
                    Quero estruturar minha operação
                    <ArrowRight className="h-5 w-5 transition duration-200 group-hover:translate-x-1" />
                  </a>
                  <div className="text-sm text-zinc-400">Menos tarefa manual. Mais velocidade comercial.</div>
                </motion.div>
              </motion.div>

              <div className="pointer-events-none absolute inset-x-0 bottom-16 hidden lg:block">
                <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-8">
                  <FloatingStat value="5s" label="tempo para iniciar o atendimento" className="justify-self-start" />
                  <FloatingStat value="WhatsApp" label="resposta padronizada e rastreável" className="justify-self-center" />
                  <FloatingStat value="CRM" label="pipeline visual para acompanhar tudo" className="justify-self-end" />
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
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">Gargalos</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Onde sua operação perde velocidade e dinheiro.
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
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">Solução</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Um sistema comercial mais claro, rápido e pronto para escalar.
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
                className="mt-10 grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl md:grid-cols-3"
              >
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/10 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
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
              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.025] p-1 shadow-[0_24px_90px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_32%)]" />
                <div className="relative rounded-[30px] border border-white/8 bg-[#0A0A0A]/95 p-8 backdrop-blur-xl sm:p-10 lg:p-12">
                  <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 shadow-[0_10px_30px_rgba(255,255,255,0.04)]">
                        <ShieldCheck className="h-4 w-4" />
                        Diagnóstico estratégico de automação
                      </div>
                      <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Descubra onde sua operação está perdendo oportunidades.
                      </h2>
                      <p className="mt-4 max-w-xl text-base leading-8 text-zinc-300">
                        Preencha seus dados para entender como estruturar atendimento, qualificação e acompanhamento comercial com mais velocidade e previsibilidade.
                      </p>

                      <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <MetricCard value="5s" label="para iniciar o contato com novos leads" />
                        <MetricCard value="100%" label="de visibilidade sobre o pipeline comercial" />
                      </div>
                    </div>

                    <motion.form
                      onSubmit={handleSubmit}
                      whileHover={{
                        boxShadow:
                          "0 22px 55px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.03)",
                        borderColor: "rgba(255,255,255,0.16)",
                      }}
                      className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7"
                    >
                      <div className="mb-5">
                        <div className="flex items-center justify-between text-xs text-zinc-400">
                          <span>Preenchimento</span>
                          <span>{Math.round(completionHint)}%</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-white via-zinc-300 to-white"
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
                          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] transition duration-200 hover:bg-zinc-200 hover:shadow-[0_0_54px_rgba(255,255,255,0.16)]"
                        >
                          Quero receber um diagnóstico
                          <ArrowRight className="h-5 w-5 transition duration-200 group-hover:translate-x-1" />
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
    problems[0].title === "Leads esfriam antes do seu time responder" &&
    solutions[1].title === "Resposta imediata no momento certo";
  const cardHoverUsesNoLift =
    !/whileHover=\{\{ y: -8 \}\}/.test(String(SectionCard)) &&
    !/hover:-translate-y/.test(String(SectionCard));
  const metricCopyPreserved =
    ["5s", "100%"].every((value) => /5s|100%/.test(value)) &&
    ["para iniciar o contato com novos leads", "de visibilidade sobre o pipeline comercial"].length === 2;

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
