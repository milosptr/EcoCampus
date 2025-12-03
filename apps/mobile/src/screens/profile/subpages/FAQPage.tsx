import { YStack, Text } from 'tamagui'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

export function FAQPage() {
  const faqs = [
    {
      question: 'How can I reset my password?',
      answer:
        "You can reset your password under Account Settings. Tap on 'Change Password' and follow the instructions.",
    },
    {
      question: 'How do I update my profile?',
      answer:
        'Tap on your profile picture or the edit icon on your profile page to change your personal information.',
    },
    {
      question: 'How is my CO₂ impact calculated?',
      answer:
        'We use standardized emission factors for transport, energy and digital actions to calculate your CO₂ impact.',
    },
    {
      question: 'What are Eco Levels?',
      answer:
        'Eco Levels represent your overall sustainability progress. You earn levels as you log more eco-friendly actions.',
    },
    {
      question: 'How does the leaderboard work?',
      answer:
        'You are ranked based on CO₂ savings and logged actions compared to other students at your university.',
    },
    {
      question: 'Can I delete my data?',
      answer:
        'Yes. You can permanently delete your account and all associated data from the Settings screen.',
    },
  ]

  return (
    <YStack
      {...({
        backgroundColor: 'white',
        borderRadius: '$8',
        padding: '$6',
        shadowColor: '$shadowColor',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        gap: '$4',
      } as any)}
    >
      <Text
        {...({
          fontSize: '$6',
          fontWeight: '600',
          color: '#5F7E68',
          marginBottom: '$2',
        } as any)}
      >
        Frequently Asked Questions
      </Text>

      <Accordion
        type='single'
        collapsible
        {...({
          width: '100%',
        } as any)}
      >
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger
              {...({
                color: '#5F7E68',
              } as any)}
            >
              {/* 🔹 WICHTIG: Frage in Text-Component wrappen */}
              <Text
                {...({
                  fontSize: '$4',
                  color: '#5F7E68',
                } as any)}
              >
                {faq.question}
              </Text>
            </AccordionTrigger>

            <AccordionContent
              {...({
                color: '#5F7E68',
                opacity: 0.8,
              } as any)}
            >
              {/* 🔹 WICHTIG: Antwort ebenfalls in Text */}
              <Text
                {...({
                  fontSize: '$3',
                  color: '#5F7E68',
                } as any)}
              >
                {faq.answer}
              </Text>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </YStack>
  )
}
