import { YStack, Text } from "tamagui";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export function FAQPage() {
  const faqs = [
    {
      question: "How can I reset my password?",
      answer: "You can reset your password under Account Settings. Tap on 'Change Password' and follow the instructions."
    },
    {
      question: "How do I update my profile?",
      answer: "Tap on your profile picture or the edit icon on your profile page to make changes to your personal information."
    },
    {
      question: "How is my CO₂ impact calculated?",
      answer: "Your CO₂ savings are calculated based on your transport mode and distance traveled. We use standard emission factors for each transport type."
    },
    {
      question: "What are Eco Levels?",
      answer: "Eco Levels represent your overall sustainability achievement. You earn levels by logging eco-friendly actions and reducing your carbon footprint."
    },
    {
      question: "How does the leaderboard work?",
      answer: "The leaderboard ranks users based on their CO₂ savings and eco-friendly actions. You can compete with other students at your university."
    },
    {
      question: "Can I delete my data?",
      answer: "Yes, you can delete your account and all associated data from the Settings page. This action cannot be undone."
    },
    {
      question: "How do I change my unit system?",
      answer: "Go to Settings > App Preferences > Units to switch between Metric (km) and Imperial (miles)."
    }
  ];

  return (
    <YStack {...({ backgroundColor: "white", borderRadius: "$8", padding: "$6", shadowColor: "$shadowColor", shadowOpacity: 0.05, shadowRadius: 10 } as any)}>
      <Text {...({ fontSize: "$6", fontWeight: "600", color: "#5F7E68", marginBottom: "$4" } as any)}>Frequently Asked Questions</Text>

      <Accordion type="single" collapsible {...({ width: "100%" } as any)}>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger {...({ color: "#5F7E68" } as any)}>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent {...({ color: "#5F7E68", opacity: 0.7 } as any)}>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </YStack>
  );
}
