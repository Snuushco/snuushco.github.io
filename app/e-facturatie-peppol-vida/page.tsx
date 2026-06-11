import { pillarPages } from "../kassie/content";
import { buildArticleMetadata, KassieArticlePage } from "../kassie/article-page";

const page = pillarPages.find((item) => item.slug === "e-facturatie-peppol-vida")!;
export const metadata = buildArticleMetadata(page);
export default function Page() { return <KassieArticlePage page={page} />; }
