import { CircleCheckBigIcon, ShieldCheckIcon } from "lucide-react";
import { useId } from "react";
import { Avatar } from "#/components/Avatar/Avatar";
import { Link } from "#/components/Link/Link";
import { cn } from "#/utils/cn";

type TemplateCardProps = {
	name: string;
	description: string;
	subtitle?: string;
	iconUrl?: string;
	detailsUrl: string;
	official?: boolean;
	selected?: boolean;
	onSelect?: () => void;
};

export const TemplateCard: React.FC<TemplateCardProps> = ({
	name,
	description,
	subtitle,
	iconUrl,
	detailsUrl,
	official = true,
	selected = false,
	onSelect,
}) => {
	const nameId = useId();
	return (
		<div
			role="radio"
			aria-checked={selected}
			aria-labelledby={nameId}
			tabIndex={0}
			className={cn(
				"flex flex-col gap-3 pt-5 px-5 pb-5 rounded-lg",
				"bg-surface-secondary border border-solid",
				"cursor-pointer",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary",
				selected ? "border-border-pending" : "border-border",
			)}
			onClick={() => onSelect?.()}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onSelect?.();
				}
			}}
		>
			<div className="flex items-start justify-between">
				<Avatar src={iconUrl} size="lg" variant="icon" />
				{official && (
					<div className="flex items-center gap-1 rounded-md bg-surface-tertiary px-1.5 py-[3px]">
						<CircleCheckBigIcon className="size-icon-xs text-highlight-sky" />
						<span className="text-2xs font-medium text-content-primary">
							Official
						</span>
					</div>
				)}
			</div>

			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-0.5">
					<h3
						id={nameId}
						className="text-sm font-semibold text-content-primary"
					>
						{name}
					</h3>
					{subtitle && (
						<p className="text-xs font-normal text-content-secondary">
							{subtitle}
						</p>
					)}
				</div>

				<div className="flex flex-col gap-3">
					<p className="text-[13px] font-normal text-content-secondary">
						{description}
					</p>

					{official && (
						<div className="flex items-center gap-1.5">
							<ShieldCheckIcon className="size-icon-sm shrink-0 text-highlight-sky" />
							<span className="text-xs font-normal text-content-secondary">
								Verified official template
							</span>
						</div>
					)}

					<Link href={detailsUrl} target="_blank" size="sm">
						View details
					</Link>
				</div>
			</div>
		</div>
	);
};
