"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

interface FeatureProps {
  title: string;
  description: string;
  icon: string;
}

const features: FeatureProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carefully curated courses designed by industry experts.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with quizzes, assignments, and discussions to enhance your learning experience.",
    icon: "🕹️",
  },
  {
    title: "Progress Tracking",
    description:
      "Stay motivated with detailed analytics, milestones, and personalized dashboards.",
    icon: "📈",
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and mentors to collaborate and grow together.",
    icon: "🤝",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-28  overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center space-y-8 px-6">
          <Badge className="px-4 py-1 text-sm font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full">
            🚀 The future of online education
          </Badge>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent leading-tight"
          >
            Learn Smarter, <br /> Grow Faster
          </motion.h1>

          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover a modern learning platform with high-quality courses,
            interactive lessons, and tools to track your progress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href={"/courses"}
              className={buttonVariants({
                size: "lg",
              })}
            >
              Start Learning →
            </Link>

            <Link
              href={"/login"}
              className={buttonVariants({
                size: "lg",
                variant: "outline",
              })}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-24 bg-muted/30 rounded-t-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="h-full border border-border/50 backdrop-blur-sm bg-card/70 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl font-bold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
