import React from 'react';
import clsx from 'clsx';
export const PodcastHeader = ({
	className,
	showDuration,
}: {
	className?: string;
	showDuration?: boolean;
}) => {
	return (
		<section className={clsx('flex flex-col pr-5  items-center ', className)}>
			<header className="flex w-[794px] items-center max-w-full  justify-between gap-5 mb-6 max-md:flex-wrap max-md:justify-center">
				<div className="flex flex-[1_0_0] w-[78px] max-w-full items-start justify-between gap-5 mt-1">
					<span className="text-white  flex text-opacity-30 text-base font-semibold mt-px">
						#
					</span>
					<span className="flex-[1_0_0]  text-white text-opacity-30 text-sm font-semibold">
						Title
					</span>
				</div>
				<span className="flex-[255px_0_0] text-white text-opacity-30 text-sm font-semibold mt-px">
					Topic
				</span>
				<div className="flex  content-between w-[154px] max-w-full items-center justify-between gap-5">
					<span className=" flex-[.5_0_0] text-white text-opacity-30 text-sm font-semibold mt-px">
						Released
					</span>
					{showDuration && (
						<img
							loading="lazy"
							srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c036624a-8364-4c33-9d38-a53f99ad81d0?apiKey=70259793749c4d08babc2ab577934360&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c036624a-8364-4c33-9d38-a53f99ad81d0?apiKey=70259793749c4d08babc2ab577934360&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c036624a-8364-4c33-9d38-a53f99ad81d0?apiKey=70259793749c4d08babc2ab577934360&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c036624a-8364-4c33-9d38-a53f99ad81d0?apiKey=70259793749c4d08babc2ab577934360&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c036624a-8364-4c33-9d38-a53f99ad81d0?apiKey=70259793749c4d08babc2ab577934360&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c036624a-8364-4c33-9d38-a53f99ad81d0?apiKey=70259793749c4d08babc2ab577934360&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c036624a-8364-4c33-9d38-a53f99ad81d0?apiKey=70259793749c4d08babc2ab577934360&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c036624a-8364-4c33-9d38-a53f99ad81d0?apiKey=70259793749c4d08babc2ab577934360&"
							className="aspect-square flex-[1_1_1] object-cover object-center w-3.5 fill-white fill-opacity-30 overflow-hidden shrink-0"
							alt="Release Image"
						/>
					)}
				</div>
			</header>
		</section>
	);
};
