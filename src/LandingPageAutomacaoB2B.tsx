import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Cog,
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
  onSubmit?: (data: FormData) => void | Promise<void>;
};

type HighlightCard = {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

type WorkflowItem = {
  title: string;
  description: string;
};

type WorkflowCardProps = WorkflowItem & {
  index: number;
};

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

const DEFAULT_N8N_WEBHOOK_URL =
  "https://n8n-n8n.fq06t3.easypanel.host/webhook/yang-lead-capture";

const highlightCards: HighlightCard[] = [
  {
    value: "5s",
    label: "Primeiro contato automatizado",
    description: "Seu lead recebe retorno enquanto ainda esta quente.",
    icon: Cog,
  },
  {
    value: "WhatsApp",
    label: "Distribuicao e resposta em tempo real",
    description: "Cada entrada ja cai no fluxo certo com contexto.",
    icon: MessageCircleMore,
  },
  {
    value: "CRM",
    label: "Funil visual sincronizado",
    description: "Time comercial entra para vender, nao para organizar.",
    icon: Funnel,
  },
];

const workflowItems: WorkflowItem[] = [
  {
    title: "Captura em pagina orientada a conversao",
    description:
      "A estrutura da LP empurra a decisao com mensagem curta, contraste alto e CTA dominante.",
  },
  {
    title: "Resposta imediata no WhatsApp",
    description:
      "Assim que o lead entra, a automacao dispara contato, qualifica e registra o contexto sem atraso humano.",
  },
  {
    title: "Pipeline limpo e operacao visivel",
    description:
      "Cada lead aparece no CRM com historico claro para a equipe atuar apenas onde existe chance real de fechamento.",
  },
];

const proofPoints = [
  "Landing pages pensadas para acao rapida, nao para distraicao.",
  "Automacao com resposta instantanea em ate 5 segundos.",
  "CRM visual sincronizado com a conversa do lead.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
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
      staggerChildren: 0.11,
    },
  },
};

function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#020202]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.14]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_30%),radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.05),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_18%),linear-gradient(180deg,transparent,rgba(255,255,255,0.02)_82%,rgba(255,255,255,0.06))]" />
      <motion.div
        className="absolute left-1/2 top-[-180px] h-[460px] w-[460px] -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.04] blur-3xl"
        animate={{ opacity: [0.22, 0.34, 0.22], scale: [1, 1.06, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-120px] left-[8%] h-[280px] w-[280px] rounded-full border border-white/8 bg-white/[0.03] blur-3xl"
        animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[6%] top-[18%] h-[220px] w-[220px] rounded-full border border-white/8 bg-white/[0.03] blur-3xl"
        animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function BrandMark() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_12px_30px_rgba(0,0,0,0.45)]">
      <div className="absolute h-[72%] w-[72%] rounded-full border border-white/10" />
      <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-white" />
      <div className="absolute right-3 top-[16px] h-5 w-px bg-white/40" />
      <div className="absolute left-[10px] top-1/2 h-px w-3 bg-white/30" />
      <Cog className="h-6 w-6 text-white" strokeWidth={1.8} />
    </div>
  );
}

function SignalPill({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/14 bg-white/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-300">
      {children}
    </div>
  );
}

function HeroCard({ value, label, description, icon: Icon }: HighlightCard) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        borderColor: "rgba(255,255,255,0.28)",
        boxShadow: "0 22px 50px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(28,28,28,0.9),rgba(12,12,12,0.92))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
      <div className="absolute inset-y-6 right-0 w-px bg-gradient-to-b from-transparent via-white/14 to-transparent" />
      <div className="flex items-start gap-4">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/18 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_24px_rgba(255,255,255,0.05)]">
          <div className="absolute h-[78%] w-[78%] rounded-full border border-white/10" />
          <Icon className="relative z-10 h-5 w-5 text-white" strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-2xl font-black tracking-tight text-white">{value}</p>
          <p className="mt-1 text-sm font-medium text-zinc-100">{label}</p>
          <p className="mt-3 text-sm leading-7 text-zinc-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function WorkflowCard({ title, description, index }: WorkflowCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      custom={0.08 * index}
      whileHover={{
        borderColor: "rgba(255,255,255,0.22)",
        backgroundColor: "rgba(255,255,255,0.04)",
      }}
      transition={{ duration: 0.3 }}
      className="rounded-[26px] border border-white/10 bg-white/[0.02] p-7 shadow-[0_18px_40px_rgba(0,0,0,0.3)]"
    >
      <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black text-sm font-semibold text-white">
        0{index + 1}
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-400">{description}</p>
    </motion.div>
  );
}

function InputField({ id, label, className = "", ...props }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium uppercase tracking-[0.16em] text-zinc-300">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-[20px] border border-white/12 bg-white/[0.035] px-4 py-3.5 text-white outline-none placeholder:text-zinc-500 transition duration-200 focus:border-white/30 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.06)] ${className}`}
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
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || DEFAULT_N8N_WEBHOOK_URL;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("loading");
    setSubmitMessage("");

    try {
      if (typeof onSubmit === "function") {
        await onSubmit(formData);
      } else {
        if (!webhookUrl) {
          throw new Error("Webhook do n8n nao configurado.");
        }

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            origem: "lp-automacao-b2b",
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Nao foi possivel enviar seus dados agora.");
        }
      }

      setSubmitState("success");
      setSubmitMessage("Pedido recebido. Agora e so acompanhar seu WhatsApp.");
      setFormData({ nome: "", whatsapp: "", email: "" });
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error ? error.message : "Ocorreu um erro ao enviar o formulario.",
      );
    }
  };

  const completionHint = useMemo(() => {
    const filled = Object.values(formData).filter(Boolean).length;
    return Math.min((filled / 3) * 100, 100);
  }, [formData]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#020202] text-white selection:bg-white/20">
      <div className="relative isolate">
        <GridBackground />

        <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto flex max-w-6xl flex-col gap-5 rounded-[32px] border border-white/10 bg-black/70 px-5 py-5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-4">
              <BrandMark />
              <div>
                <p className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                  Automacao B2B
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Infraestrutura comercial de alta conversao
                </p>
              </div>
            </div>

            <a
              href="#formulario"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white px-5 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-zinc-200"
            >
              Falar com Especialista
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.header>

          <main className="mx-auto max-w-6xl">
            <section className="relative pt-10 sm:pt-14">
              <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,10,0.94),rgba(3,3,3,0.98))] px-6 py-10 shadow-[0_28px_80px_rgba(0,0,0,0.55)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_40%)]" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/[0.03] to-transparent" />

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="relative z-10"
                >
                  <motion.div variants={fadeUp} custom={0.05} className="flex justify-center">
                    <SignalPill>Infraestrutura de vendas em modo automatico</SignalPill>
                  </motion.div>

                  <motion.h1
                    variants={fadeUp}
                    custom={0.12}
                    className="mx-auto mt-8 max-w-5xl text-center text-5xl font-black leading-[0.92] tracking-[-0.04em] text-white sm:text-6xl lg:text-[5.4rem]"
                  >
                    Voce esta pagando para o seu concorrente vender.
                  </motion.h1>

                  <motion.p
                    variants={fadeUp}
                    custom={0.2}
                    className="mx-auto mt-6 max-w-3xl text-center text-base leading-8 text-zinc-300 sm:text-xl"
                  >
                    Implementamos infraestruturas de automacao que respondem seus leads em 5
                    segundos no WhatsApp e organizam todo o seu funil comercial.
                  </motion.p>

                  <motion.div
                    variants={fadeUp}
                    custom={0.28}
                    className="mt-10 flex flex-col items-center justify-center gap-4"
                  >
                    <a
                      href="#formulario"
                      className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-[20px] border border-white bg-white px-8 py-4 text-base font-bold text-black shadow-[0_0_40px_rgba(255,255,255,0.08)] transition duration-200 hover:bg-zinc-200"
                    >
                      Quero Automatizar Minhas Vendas
                      <ArrowRight className="h-5 w-5 transition duration-200 group-hover:translate-x-1" />
                    </a>
                    <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                      Estrutura enxuta, resposta rapida, operacao organizada.
                    </p>
                  </motion.div>

                  <motion.div
                    variants={stagger}
                    className="mt-14 grid gap-5 lg:grid-cols-3"
                  >
                    {highlightCards.map((card) => (
                      <HeroCard key={card.value} {...card} />
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="py-20"
            >
              <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
                    Estrutura
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                    A LP ficou mais direta, mais densa e visualmente mais forte.
                  </h2>
                </div>
                <div className="max-w-xl rounded-[24px] border border-white/10 bg-white/[0.02] p-5 text-sm leading-7 text-zinc-400">
                  O visual agora trabalha com contraste seco, grid fino e blocos mais
                  arquitetonicos para passar sensacao de sistema, velocidade e controle.
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                {workflowItems.map((item, index) => (
                  <WorkflowCard key={item.title} index={index} {...item} />
                ))}
              </div>
            </motion.section>

            <motion.section
              id="formulario"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="pb-24"
            >
              <div className="overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,9,9,0.96),rgba(4,4,4,0.98))] shadow-[0_28px_90px_rgba(0,0,0,0.55)]">
                <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
                  <div className="border-b border-white/8 px-6 py-8 sm:px-8 lg:border-b-0 lg:border-r">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.22em] text-zinc-300">
                      <ShieldCheck className="h-4 w-4" />
                      Diagnostico de automacao
                    </div>

                    <h2 className="mt-6 max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                      Veja como essa estrutura pode operar na sua empresa.
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-8 text-zinc-300">
                      Preencha o formulario e receba uma avaliacao para transformar clique em
                      conversa, conversa em pipeline e pipeline em faturamento.
                    </p>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black">
                            <Zap className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-2xl font-black text-white">5s</p>
                            <p className="text-sm text-zinc-400">para iniciar o contato</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black">
                            <LayoutDashboard className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-2xl font-black text-white">CRM</p>
                            <p className="text-sm text-zinc-400">sincronizado com o fluxo</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 space-y-4">
                      {proofPoints.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3 rounded-[20px] border border-white/8 bg-white/[0.02] px-4 py-4"
                        >
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-white" />
                          <p className="text-sm leading-7 text-zinc-400">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 py-8 sm:px-8">
                    <motion.form
                      onSubmit={handleSubmit}
                      whileHover={{
                        borderColor: "rgba(255,255,255,0.2)",
                        boxShadow: "0 26px 60px rgba(0,0,0,0.42)",
                      }}
                      className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)] sm:p-7"
                    >
                      <div className="mb-6">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-zinc-500">
                          <span>Preenchimento</span>
                          <span>{Math.round(completionHint)}%</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/6">
                          <motion.div
                            className="h-full rounded-full bg-white"
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
                          label="Email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="voce@empresa.com"
                          required
                        />

                        <button
                          type="submit"
                          disabled={submitState === "loading"}
                          className="group inline-flex w-full items-center justify-center gap-3 rounded-[20px] border border-white bg-white px-6 py-4 text-base font-bold uppercase tracking-[0.08em] text-black transition duration-200 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {submitState === "loading"
                            ? "Enviando diagnostico..."
                            : "Quero Automatizar Minhas Vendas"}
                          <ArrowRight className="h-5 w-5 transition duration-200 group-hover:translate-x-1" />
                        </button>

                        {submitMessage ? (
                          <p
                            className={`text-sm leading-6 ${
                              submitState === "success" ? "text-zinc-200" : "text-red-300"
                            }`}
                          >
                            {submitMessage}
                          </p>
                        ) : null}
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
  const hasThreeHighlightCards = highlightCards.length === 3;
  const heroCopyPreserved =
    highlightCards[0].value === "5s" &&
    proofPoints[0] === "Landing pages pensadas para acao rapida, nao para distraicao.";
  const workflowCountPreserved = workflowItems.length === 3;

  return (
    <div className="hidden" aria-hidden="true">
      <HiddenTestValue label="highlight-cards-count">{String(hasThreeHighlightCards)}</HiddenTestValue>
      <HiddenTestValue label="hero-copy-preserved">{String(heroCopyPreserved)}</HiddenTestValue>
      <HiddenTestValue label="workflow-count">{String(workflowCountPreserved)}</HiddenTestValue>
    </div>
  );
}
