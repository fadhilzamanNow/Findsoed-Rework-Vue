<script setup lang="ts">
import Hero from "../components/LandingPage/Hero.vue";
import Navbar from "../components/LandingPage/Navbar.vue";
import SponsorContainer from "../components/LandingPage/SponsorContainer.vue";
import MissionSection from "../components/LandingPage/MissionSection.vue";
// import FeatureSection from "../components/LandingPage/FeatureSection.vue";
// import QuoteSection from "../components/LandingPage/QuoteSection.vue";
// import OtherQuoteSection from "../components/LandingPage/OtherQuoteSection.vue";
// import StatisticSection from "../components/LandingPage/StatisticSection.vue";
// import TestimonialSection from "../components/LandingPage/TestimonialSection.vue";
// import UpdateSection from "../components/LandingPage/UpdateSection.vue";
import Footer from "../components/LandingPage/Footer.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useSeoMeta } from "@unhead/vue";
import RenderOnViewPortEntry from "../components/LazyLoad/RenderOnViewPortEntry.vue";
import { defineAsyncComponent } from "vue";

useSeoMeta({
  title: "SSR RSbuild Landing Page - Findsoed Rework",
  description: "SSR Rsbuild Halaman Landing Page untuk Findsoed Rework",
  ogTitle: "SSR Rsbuild Landing Page - Findsoed Rework",
  ogDescription:
    "SSR Halaman Landing Page untuk Findsoed Rework yang berisikan informasi secara umum mengenai Findsoed",
  ogUrl: "http://localhost:3500/",
  ogSiteName: "Findsoed Rework",
  ogType: "website",
  author: "Muhammad Ilham Isfadhillah",
  twitterTitle: "SSR Rsbuild Landing Page - Findsoed Rework",
  robots: "index, follow",
});

const { authToken } = storeToRefs(useAuthStore());
const navigate = useRouter();

watchEffect(() => {
  if (authToken.value) {
    navigate.push("/home");
  }
});

const LazyFeatureSection = defineAsyncComponent(
  () => import("../components/LandingPage/FeatureSection.vue")
);

const LazyQuoteSection = defineAsyncComponent(
  () => import("../components/LandingPage/QuoteSection.vue")
);

const LazyOtherQuoteSection = defineAsyncComponent(
  () => import("../components/LandingPage/OtherQuoteSection.vue")
);

const LazyStatisticSection = defineAsyncComponent(
  () => import("../components/LandingPage/StatisticSection.vue")
);

const LazyTestimonialSection = defineAsyncComponent(
  () => import("../components/LandingPage/TestimonialSection.vue")
);

const LazyUpdateSection = defineAsyncComponent(
  () => import("../components/LandingPage/UpdateSection.vue")
);
</script>

<template>
  <main class="relative min-h-screen overflow-hidden overscroll-none">
    <div
      class="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-blue-700/20 to-pink-100/20 rounded-full blur-[80px] -z-10"
    ></div>
    <div class="overflow-hidden">
      <Navbar />
      <Hero />
      <SponsorContainer />
      <MissionSection />
      <RenderOnViewPortEntry :threshold="0.35">
        <LazyFeatureSection />
      </RenderOnViewPortEntry>
      <RenderOnViewPortEntry :threshold="0.35">
        <LazyQuoteSection />
      </RenderOnViewPortEntry>
      <RenderOnViewPortEntry :threshold="0.35">
        <LazyOtherQuoteSection />
      </RenderOnViewPortEntry>
      <RenderOnViewPortEntry :threshold="0.35">
        <LazyStatisticSection />
      </RenderOnViewPortEntry>
      <RenderOnViewPortEntry :threshold="0.35">
        <LazyTestimonialSection />
      </RenderOnViewPortEntry>
      <RenderOnViewPortEntry :threshold="0.35">
        <LazyUpdateSection />
      </RenderOnViewPortEntry>
      <Footer />
    </div>
  </main>
</template>
