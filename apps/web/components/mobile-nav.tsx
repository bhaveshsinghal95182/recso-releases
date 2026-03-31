import { cn } from "@workspace/ui/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@workspace/ui/components/portal";
import { Button } from "@workspace/ui/components/button";
import { navLinks } from "@/components/header";
import { XIcon, MenuIcon } from "lucide-react";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="md:hidden">
			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label="Toggle menu"
				className="md:hidden"
				onClick={() => setOpen(!open)}
				size="icon"
				variant="outline"
			>
				{open ? (
					<XIcon className="size-4.5" />
				) : (
					<MenuIcon className="size-4.5" />
				)}
			</Button>
			{open && (
				<Portal className="top-14" id="mobile-menu">
					<PortalBackdrop onClick={() => setOpen(false)} />
					<div
						className={cn(
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
							"relative w-full p-4"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="grid gap-y-2">
							{navLinks.map((link) => (
								<Button
									className="justify-start"
									key={link.label}
									variant="ghost"
									onClick={() => setOpen(false)}
								>
									<a href={link.href}>{link.label}</a>
								</Button>
							))}
						</div>
						<div className="mt-12 flex flex-col gap-2">
							<Button className="w-full cursor-target" onClick={() => setOpen(false)}>
								<a href="https://apps.microsoft.com/detail/9P697TXC3BCL?hl=en-us&gl=IN&ocid=pdpshare">Download</a>
							</Button>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
}
