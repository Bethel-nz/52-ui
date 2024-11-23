import { getPlaiceholder } from 'plaiceholder';
import fs from 'node:fs/promises';

export async function getBlurData(imagePath: string) {
	const buffer = await fs.readFile(`./public${imagePath}`);
	const { base64, color } = await getPlaiceholder(buffer);

	return {
		blurDataURL: base64,
		color: color.hex,
	};
}
