#!/usr/bin/env node
/**
 * Initialize blog views data with default counts
 * Run this script once to set up initial view counts for all blogs
 */

import { getAllPosts } from "../lib/blog";
import { setViews, getViews } from "../lib/db";

async function initializeBlogViews() {
    try {
        console.log("Initializing blog views data...");

        // Get all blog posts
        const posts = getAllPosts();
        let initializedCount = 0;

        for (const post of posts) {
            const slug = (post as any).slug;

            // Check if already has views
            const currentViews = await getViews(slug);

            if (currentViews === 0) {
                // Generate random view count between 50 and 500
                const randomViews = Math.floor(Math.random() * 450) + 50;
                await setViews(slug, randomViews);
                initializedCount++;
            }
        }

        console.log("✓ Blog views initialized successfully!");
        console.log(`✓ Added/Updated ${initializedCount} blog posts explicitly.`);
    } catch (error) {
        console.error("✗ Error initializing blog views:", error);
        process.exit(1);
    }
}

initializeBlogViews();
