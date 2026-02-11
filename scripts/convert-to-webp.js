import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const WEBP_QUALITY = 80;

async function convertToWebP(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .webp({ quality: WEBP_QUALITY })
            .toFile(outputPath);

        const inputStats = await stat(inputPath);
        const outputStats = await stat(outputPath);
        const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`✓ ${basename(inputPath)} → ${basename(outputPath)} (${reduction}% smaller)`);
        return { success: true, reduction: parseFloat(reduction) };
    } catch (error) {
        console.error(`✗ Error converting ${inputPath}:`, error.message);
        return { success: false, error: error.message };
    }
}

async function processDirectory(dirPath) {
    try {
        const entries = await readdir(dirPath, { withFileTypes: true });
        const results = { converted: 0, failed: 0, totalReduction: 0 };

        for (const entry of entries) {
            const fullPath = join(dirPath, entry.name);

            if (entry.isDirectory()) {
                const subResults = await processDirectory(fullPath);
                results.converted += subResults.converted;
                results.failed += subResults.failed;
                results.totalReduction += subResults.totalReduction;
            } else if (entry.isFile()) {
                const ext = extname(entry.name).toLowerCase();
                if (IMAGE_EXTENSIONS.includes(ext)) {
                    const outputPath = fullPath.replace(ext, '.webp');
                    const result = await convertToWebP(fullPath, outputPath);

                    if (result.success) {
                        results.converted++;
                        results.totalReduction += result.reduction;
                    } else {
                        results.failed++;
                    }
                }
            }
        }

        return results;
    } catch (error) {
        console.error(`Error processing directory ${dirPath}:`, error.message);
        return { converted: 0, failed: 0, totalReduction: 0 };
    }
}

async function main() {
    console.log('🚀 Starting WebP conversion...\n');

    const assetsPath = join(__dirname, '..', 'src', 'assets');
    const publicPath = join(__dirname, '..', 'public');

    console.log('Converting assets in src/assets/...');
    const assetsResults = await processDirectory(assetsPath);

    console.log('\nConverting assets in public/...');
    const publicResults = await processDirectory(publicPath);

    const totalConverted = assetsResults.converted + publicResults.converted;
    const totalFailed = assetsResults.failed + publicResults.failed;
    const avgReduction = totalConverted > 0
        ? ((assetsResults.totalReduction + publicResults.totalReduction) / totalConverted).toFixed(1)
        : 0;

    console.log('\n📊 Conversion Summary:');
    console.log(`   ✓ Converted: ${totalConverted} images`);
    console.log(`   ✗ Failed: ${totalFailed} images`);
    console.log(`   💾 Average size reduction: ${avgReduction}%`);
    console.log('\n✨ WebP conversion complete!');
}

main().catch(console.error);
