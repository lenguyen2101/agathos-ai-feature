import type { Metadata } from "next";
import DocumentDetail from "@/components/DocumentDetail";
import { knowledgeTopics } from "@/lib/knowledge-topics";

type Params = { topicId: string };

export function generateStaticParams(): Params[] {
  return knowledgeTopics.map((t) => ({ topicId: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { topicId } = await params;
  const topic = knowledgeTopics.find((t) => t.id === topicId);
  if (!topic) return { title: "Document not found — Agathos AI" };
  return {
    title: `${topic.title} — Agathos AI`,
    description: topic.description,
  };
}

export default async function DocTopicPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { topicId } = await params;
  return <DocumentDetail topicId={topicId} />;
}
