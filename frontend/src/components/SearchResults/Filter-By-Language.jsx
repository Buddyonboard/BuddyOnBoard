import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import CONST from '@/utils/Constants';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function FilterByLanguage({
	languages,
	setSelectedLanguages,
	selectedLanguages
}) {
	const toggleLanguage = (value) => {
		setSelectedLanguages((prev) =>
			prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
		);
		// setSelectedLanguages(value);
	};

	const removeTag = (tag) => {
		setSelectedLanguages(selectedLanguages.filter((t) => t !== tag));
	};

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger className="w-full justify-between" asChild>
					<Button className="text-bob-filters-placeholder-color bg-primary-color">
						{CONST.buddySearch.language}
						<ChevronDownIcon
							className="-me-1 opacity-60"
							size={16}
							aria-hidden="true"
							color="black"
						/>
					</Button>
				</DropdownMenuTrigger>

				{/*** Selected Options Tags ***/}
				{selectedLanguages.length > 0 && (
					<div className="grid grid-cols-3 mt-3">
						{selectedLanguages.map((tag) => (
							<Badge
								key={tag}
								className="flex bg-primary-color text-bob-filters-placeholder-color 
                                items-center font-normal gap-2 rounded-xl"
							>
								{tag}
								<button
									type="button"
									className="ml-1 rounded-sm hover:bg-muted cursor-pointer 
                                    text-bob-filters-placeholder-color"
									onClick={() => {
										// e.stopPropagation(); // prevent dropdown toggle
										removeTag(tag);
									}}
								>
									<X className="h-3 w-3" />
								</button>
							</Badge>
						))}
					</div>
				)}

				<DropdownMenuContent className="lg:min-w-[16rem]">
					{languages.sort().map((lang, index) => (
						<DropdownMenuItem
							key={index}
							onSelect={(e) => {
								e.preventDefault(); // Prevent dropdown from closing
								toggleLanguage(lang);
							}}
							className="flex items-center gap-2 cursor-pointer"
						>
							<Checkbox
								className="data-[state=checked]:bg-bob-color cursor-pointer border-black"
								checked={selectedLanguages.includes(lang)}
								CheckIconColor="text-white"
							/>
							{lang}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
