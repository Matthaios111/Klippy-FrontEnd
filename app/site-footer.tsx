// Legacy wrapper — keep existing import path working.
// New code should import from @/components/site-footer with explicit locale.
import { defaultLocale } from "../lib/i18n/config";
import SiteFooterNew from "../components/site-footer";

type Props = { locale?: string };

export default function SiteFooter({ locale = defaultLocale }: Props) {
  return <SiteFooterNew locale={locale} />;
}
