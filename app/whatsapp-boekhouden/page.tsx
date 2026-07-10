import { pillarPages } from "../kassie/content";
import { buildArticleMetadata, KassieArticlePage } from "../kassie/article-page";
const page = pillarPages.find((p) => p.slug === "whatsapp-boekhouden")!;
export const metadata = buildArticleMetadata(page);
export default function Page() { return <KassieArticlePage page={page} />; }
