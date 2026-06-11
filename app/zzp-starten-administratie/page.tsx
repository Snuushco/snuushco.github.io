import { pillarPages } from "../kassie/content";
import { buildArticleMetadata, KassieArticlePage } from "../kassie/article-page";

const page = pillarPages.find((item) => item.slug === "zzp-starten-administratie")!;
export const metadata = buildArticleMetadata(page);
export default function Page() { return <KassieArticlePage page={page} />; }
