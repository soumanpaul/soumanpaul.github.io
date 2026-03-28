import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

export const getViews = async (slug: string): Promise<number> => {
    try {
        const view = await prisma.views.findUnique({
            where: { slug },
        });
        return view ? view.count : 0;
    } catch (error) {
        console.error(`[DB] Failed to get views for ${slug}:`, error);
        return 0;
    }
};

export const incrementView = async (slug: string): Promise<number> => {
    try {
        const view = await prisma.views.upsert({
            where: { slug },
            create: { slug, count: 1 },
            update: { count: { increment: 1 } },
        });
        return view.count;
    } catch (error) {
        console.error(`[DB] Failed to increment views for ${slug}:`, error);
        // Return a safe fallback or throw depending on desired behavior.
        // Throwing ensures the API reports 500 properly if DB is down.
        throw error;
    }
};

export const setViews = async (slug: string, count: number): Promise<void> => {
    try {
        await prisma.views.upsert({
            where: { slug },
            create: { slug, count },
            update: { count },
        });
    } catch (error) {
        console.error(`[DB] Failed to set views for ${slug}:`, error);
        throw error;
    }
};

export default prisma;

