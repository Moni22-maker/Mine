interface LevoResponse {
  text: string;
  emotion: 'happy' | 'sad' | 'neutral' | 'excited' | 'concerned';
}

const greetings = [
  "Hi there! I'm so glad you're here. How can I help brighten your day?",
  "Hello! It's wonderful to see you. What's on your mind today?",
  "Hey! I'm here and ready to help. What would you like to talk about?",
  "Hi! I hope you're having a great day. How can I assist you?"
];

const workAdvice = [
  "Try breaking that big task into smaller, manageable pieces. You've got this!",
  "Remember to take short breaks every hour. Your brain needs time to recharge.",
  "Focus on one thing at a time. Multitasking can actually slow you down.",
  "Have you tried the Pomodoro Technique? 25 minutes of focused work, then a 5-minute break.",
  "Sometimes a quick walk or some fresh air can give you the clarity you need."
];

const motivationalResponses = [
  "You're doing amazing! Every step forward, no matter how small, is progress.",
  "I believe in you! You have the strength to overcome any challenge.",
  "Remember, it's okay to have tough days. What matters is that you keep going.",
  "You're more resilient than you know. Trust in your ability to figure things out.",
  "Every expert was once a beginner. Be patient with yourself as you learn and grow."
];

const stressRelief = [
  "Let's take a deep breath together. Breathe in slowly... and out. You're safe right now.",
  "It sounds like you're feeling overwhelmed. That's completely normal. What's one small thing you can do right now?",
  "Stress is tough, but you're tougher. Can you tell me what's weighing on your mind?",
  "Sometimes when we're stressed, our minds race. Try focusing on just this moment, right here with me.",
  "You don't have to carry everything alone. I'm here to listen and help however I can."
];

const breakReminders = [
  "Hey, you've been working hard! How about a quick stretch or a walk around the block?",
  "Time for a little break! Your eyes and mind will thank you for stepping away from the screen.",
  "You deserve a moment to breathe. Maybe grab some water or do a few stretches?",
  "Working hard is great, but taking breaks actually makes you more productive. Treat yourself to a few minutes of rest."
];

const analyzeUserInput = (input: string): { intent: string; emotion: string } => {
  const lowerInput = input.toLowerCase();
  
  // Detect emotions
  let emotion = 'neutral';
  if (lowerInput.includes('sad') || lowerInput.includes('down') || lowerInput.includes('depressed')) {
    emotion = 'sad';
  } else if (lowerInput.includes('happy') || lowerInput.includes('great') || lowerInput.includes('excited')) {
    emotion = 'happy';
  } else if (lowerInput.includes('stressed') || lowerInput.includes('overwhelmed') || lowerInput.includes('anxious')) {
    emotion = 'concerned';
  }

  // Detect intents
  let intent = 'general';
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
    intent = 'greeting';
  } else if (lowerInput.includes('work') || lowerInput.includes('job') || lowerInput.includes('task') || lowerInput.includes('project')) {
    intent = 'work';
  } else if (lowerInput.includes('break') || lowerInput.includes('tired') || lowerInput.includes('rest')) {
    intent = 'break';
  } else if (lowerInput.includes('help') || lowerInput.includes('advice') || lowerInput.includes('suggest')) {
    intent = 'help';
  } else if (lowerInput.includes('motivat') || lowerInput.includes('inspir') || lowerInput.includes('encourage')) {
    intent = 'motivation';
  } else if (lowerInput.includes('stress') || lowerInput.includes('overwhelm') || lowerInput.includes('anxious')) {
    intent = 'stress';
  }

  return { intent, emotion };
};

export const getLevoResponse = async (userInput: string): Promise<LevoResponse> => {
  const { intent, emotion } = analyzeUserInput(userInput);
  
  let responseText = '';
  let responseEmotion: LevoResponse['emotion'] = 'neutral';

  // Add a small delay to simulate processing
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

  switch (intent) {
    case 'greeting':
      responseText = greetings[Math.floor(Math.random() * greetings.length)];
      responseEmotion = 'happy';
      break;
    
    case 'work':
      responseText = workAdvice[Math.floor(Math.random() * workAdvice.length)];
      responseEmotion = 'happy';
      break;
    
    case 'motivation':
      responseText = motivationalResponses[Math.floor(Math.random() * motivationalResponses.length)];
      responseEmotion = 'excited';
      break;
    
    case 'stress':
      responseText = stressRelief[Math.floor(Math.random() * stressRelief.length)];
      responseEmotion = 'concerned';
      break;
    
    case 'break':
      responseText = breakReminders[Math.floor(Math.random() * breakReminders.length)];
      responseEmotion = 'happy';
      break;
    
    default:
      // Handle general conversation
      if (emotion === 'sad') {
        responseText = "I can hear that you might be going through a tough time. I'm here for you. Would you like to talk about what's bothering you, or would you prefer some gentle encouragement?";
        responseEmotion = 'concerned';
      } else if (emotion === 'happy') {
        responseText = "That's wonderful! I love hearing positive energy. Your good mood is contagious! What's making you feel so great today?";
        responseEmotion = 'excited';
      } else {
        const generalResponses = [
          "I'm here to listen and help in any way I can. What's on your mind?",
          "Thank you for sharing that with me. How can I best support you right now?",
          "I appreciate you talking with me. Is there something specific I can help you with?",
          "It's great that we can chat like this. What would be most helpful for you today?"
        ];
        responseText = generalResponses[Math.floor(Math.random() * generalResponses.length)];
        responseEmotion = 'neutral';
      }
  }

  return { text: responseText, emotion: responseEmotion };
};