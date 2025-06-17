interface LevoResponse {
  text: string;
  emotion: 'happy' | 'sad' | 'neutral' | 'excited' | 'concerned';
}

const greetings = [
  "Hello! I'm Levo, your AI assistant. I'm here to help you with any questions, tasks, or conversations you'd like to have. How can I assist you today?",
  "Good to see you! I'm ready to help with whatever you need - whether it's answering questions, providing advice, or just having a thoughtful conversation. What's on your mind?",
  "Welcome! I'm here to provide assistance, insights, and support for any topic you'd like to explore. How may I help you today?",
  "Hello there! I'm designed to be helpful, informative, and engaging. Whether you need practical assistance or want to discuss ideas, I'm here for you. What would you like to talk about?"
];

const workAdvice = [
  "For complex tasks, I recommend breaking them into smaller, manageable components. This approach, often called 'chunking,' can make overwhelming projects feel more achievable and help you maintain momentum as you complete each piece.",
  "Regular breaks are scientifically proven to enhance productivity and creativity. Consider implementing the Pomodoro Technique: 25 minutes of focused work followed by a 5-minute break. This can help maintain your cognitive performance throughout the day.",
  "Multitasking often reduces efficiency rather than improving it. Research suggests that focusing on one task at a time leads to better quality work and faster completion. Try dedicating specific time blocks to individual tasks.",
  "Time management is crucial for productivity. Consider prioritizing your tasks using methods like the Eisenhower Matrix, which categorizes tasks by urgency and importance. This can help you focus on what truly matters.",
  "Sometimes a change of environment or a brief physical activity can provide the mental clarity needed to solve problems. A short walk or even standing and stretching can stimulate creative thinking."
];

const motivationalResponses = [
  "Progress isn't always linear, and that's perfectly normal. Every step forward, regardless of size, contributes to your overall growth and development. Acknowledge your efforts and celebrate small wins along the way.",
  "Challenges are opportunities for growth and learning. While they may feel overwhelming in the moment, they often lead to increased resilience, new skills, and valuable insights that serve you well in the future.",
  "It's important to remember that everyone faces difficulties and setbacks. What distinguishes successful individuals is their persistence and willingness to learn from experiences. You have the capability to overcome current challenges.",
  "Self-compassion is just as important as determination. Treat yourself with the same kindness you'd offer a good friend facing similar circumstances. This balanced approach often leads to better outcomes and sustained motivation.",
  "Growth and mastery take time. Every expert in any field was once a beginner who persisted through the learning process. Trust in your ability to develop and improve with consistent effort and patience."
];

const stressRelief = [
  "I understand you're experiencing stress, which is a natural human response to challenging situations. Let's take a moment to address this together. Can you tell me more about what's contributing to these feelings so I can offer more targeted support?",
  "Stress can feel overwhelming, but there are effective strategies to manage it. Deep breathing exercises, mindfulness techniques, or even a brief walk can help regulate your nervous system. What feels most accessible to you right now?",
  "When we're stressed, our minds often focus on worst-case scenarios. It can be helpful to ground yourself in the present moment and identify what aspects of the situation you can actually control. Would you like to explore this together?",
  "Stress is often a signal that we're dealing with something important to us. While uncomfortable, it's also an indication that you care about the outcome. Let's work together to develop strategies that can help you navigate this situation more effectively.",
  "Remember that seeking support is a sign of wisdom, not weakness. Whether it's talking through problems, asking for help with tasks, or simply having someone listen, connection with others is a powerful stress management tool."
];

const breakReminders = [
  "I notice you've been working diligently. Research shows that regular breaks actually improve focus and productivity. Consider taking a few minutes to step away from your current task - your brain will thank you for the reset.",
  "Taking breaks isn't just about rest; it's about optimizing your cognitive performance. A brief pause can help consolidate what you've learned and provide fresh perspective when you return to your work.",
  "Your well-being is important for sustained productivity. Consider taking a moment to hydrate, stretch, or simply look away from your screen. These small acts of self-care can significantly impact your energy and focus.",
  "Mental fatigue is real and can impact the quality of your work. A strategic break now can prevent burnout later and help you maintain high standards throughout your day. What kind of break would feel most refreshing to you?"
];

const analyzeUserInput = (input: string): { intent: string; emotion: string } => {
  const lowerInput = input.toLowerCase();
  
  // Detect emotions
  let emotion = 'neutral';
  if (lowerInput.includes('sad') || lowerInput.includes('down') || lowerInput.includes('depressed') || lowerInput.includes('upset')) {
    emotion = 'sad';
  } else if (lowerInput.includes('happy') || lowerInput.includes('great') || lowerInput.includes('excited') || lowerInput.includes('wonderful')) {
    emotion = 'happy';
  } else if (lowerInput.includes('stressed') || lowerInput.includes('overwhelmed') || lowerInput.includes('anxious') || lowerInput.includes('worried')) {
    emotion = 'concerned';
  }

  // Detect intents
  let intent = 'general';
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey') || lowerInput.includes('good morning') || lowerInput.includes('good afternoon')) {
    intent = 'greeting';
  } else if (lowerInput.includes('work') || lowerInput.includes('job') || lowerInput.includes('task') || lowerInput.includes('project') || lowerInput.includes('productivity')) {
    intent = 'work';
  } else if (lowerInput.includes('break') || lowerInput.includes('tired') || lowerInput.includes('rest') || lowerInput.includes('exhausted')) {
    intent = 'break';
  } else if (lowerInput.includes('help') || lowerInput.includes('advice') || lowerInput.includes('suggest') || lowerInput.includes('recommend')) {
    intent = 'help';
  } else if (lowerInput.includes('motivat') || lowerInput.includes('inspir') || lowerInput.includes('encourage') || lowerInput.includes('confidence')) {
    intent = 'motivation';
  } else if (lowerInput.includes('stress') || lowerInput.includes('overwhelm') || lowerInput.includes('anxious') || lowerInput.includes('pressure')) {
    intent = 'stress';
  } else if (lowerInput.includes('explain') || lowerInput.includes('what is') || lowerInput.includes('how does') || lowerInput.includes('tell me about')) {
    intent = 'information';
  }

  return { intent, emotion };
};

export const getLevoResponse = async (userInput: string): Promise<LevoResponse> => {
  const { intent, emotion } = analyzeUserInput(userInput);
  
  let responseText = '';
  let responseEmotion: LevoResponse['emotion'] = 'neutral';

  // Add a small delay to simulate processing
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

  switch (intent) {
    case 'greeting':
      responseText = greetings[Math.floor(Math.random() * greetings.length)];
      responseEmotion = 'happy';
      break;
    
    case 'work':
      responseText = workAdvice[Math.floor(Math.random() * workAdvice.length)];
      responseEmotion = 'neutral';
      break;
    
    case 'motivation':
      responseText = motivationalResponses[Math.floor(Math.random() * motivationalResponses.length)];
      responseEmotion = 'happy';
      break;
    
    case 'stress':
      responseText = stressRelief[Math.floor(Math.random() * stressRelief.length)];
      responseEmotion = 'concerned';
      break;
    
    case 'break':
      responseText = breakReminders[Math.floor(Math.random() * breakReminders.length)];
      responseEmotion = 'neutral';
      break;
    
    case 'information':
      responseText = "I'd be happy to help explain that topic. Could you provide a bit more detail about what specific aspect you'd like me to focus on? This will help me give you the most relevant and useful information.";
      responseEmotion = 'neutral';
      break;
    
    case 'help':
      responseText = "I'm here to assist you in whatever way I can. Whether you need information, advice, problem-solving support, or just someone to discuss ideas with, I'm ready to help. What specific area would you like assistance with?";
      responseEmotion = 'neutral';
      break;
    
    default:
      // Handle general conversation with more sophisticated responses
      if (emotion === 'sad') {
        responseText = "I can sense that you might be going through a difficult time, and I want you to know that your feelings are valid. While I'm here to listen and offer support, please remember that it's also important to reach out to friends, family, or professionals when you need additional help. What would be most helpful for you right now?";
        responseEmotion = 'concerned';
      } else if (emotion === 'happy') {
        responseText = "It's wonderful to hear the positive energy in your message! Happiness and enthusiasm can be incredibly motivating and often lead to great outcomes. I'd love to hear more about what's bringing you joy or excitement today.";
        responseEmotion = 'excited';
      } else {
        const generalResponses = [
          "Thank you for sharing that with me. I'm here to engage in meaningful conversation and provide assistance where I can. What aspects of this topic would you like to explore further?",
          "I appreciate you taking the time to communicate with me. Every conversation is an opportunity to learn and help. How can I best support you or contribute to what you're thinking about?",
          "That's an interesting point you've raised. I'm designed to be helpful, informative, and engaging across a wide range of topics. What direction would you like our conversation to take?",
          "I'm here to provide thoughtful responses and assistance tailored to your needs. Whether you're looking for information, advice, creative input, or just engaging dialogue, I'm ready to help. What would be most valuable to you?"
        ];
        responseText = generalResponses[Math.floor(Math.random() * generalResponses.length)];
        responseEmotion = 'neutral';
      }
  }

  return { text: responseText, emotion: responseEmotion };
};