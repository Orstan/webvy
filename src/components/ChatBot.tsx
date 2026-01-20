'use client';

import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaCommentDots, FaPaperPlane } from 'react-icons/fa';
import styles from './ChatBot.module.css';
import { useI18n } from '@/utils/i18n-context';

interface Message {
  type: 'bot' | 'user';
  text: string;
  quickReplies?: { text: string; value: string }[];
}

export default function ChatBot() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ініціалізація чат-бота при першому рендерингу
  useEffect(() => {
    setMessages([
      {
        type: 'bot',
        text: t('chatbot.welcome'),
        quickReplies: [
          { text: t('chatbot.quick_replies.order'), value: t('chatbot.quick_replies.order_value') },
          { text: t('chatbot.quick_replies.prices'), value: t('chatbot.quick_replies.prices_value') },
          { text: t('chatbot.quick_replies.contacts'), value: t('chatbot.quick_replies.contacts_value') }
        ]
      }
    ]);
  }, [t]);  // Додаємо t як залежність

  // Прокрутка до останнього повідомлення
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Фокус на полі вводу при відкритті чату
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Додаємо повідомлення користувача
    const userMessage: Message = {
      type: 'user',
      text: inputValue
    };
    setMessages([...messages, userMessage]);
    setInputValue('');

    // Генеруємо відповідь бота
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 500);
  };

  const handleQuickReply = (value: string) => {
    // Додаємо повідомлення користувача з вибраної швидкої відповіді
    const userMessage: Message = {
      type: 'user',
      text: value
    };
    setMessages([...messages, userMessage]);

    // Генеруємо відповідь бота
    setTimeout(() => {
      const botResponse = getBotResponse(value);
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 500);
  };

  const getBotResponse = (message: string): Message => {
    const lowerMessage = message.toLowerCase();
    const orderKeywords = t('chatbot.keywords.order').toLowerCase().split(',');
    const priceKeywords = t('chatbot.keywords.price').toLowerCase().split(',');
    const contactKeywords = t('chatbot.keywords.contact').toLowerCase().split(',');
    
    // Перевіряємо, чи містить повідомлення ключові слова для замовлення
    if (orderKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        type: 'bot',
        text: t('chatbot.responses.order'),
        quickReplies: [
          { text: t('chatbot.quick_replies.prices'), value: t('chatbot.quick_replies.prices_value') },
          { text: t('chatbot.quick_replies.contacts'), value: t('chatbot.quick_replies.contacts_value') }
        ]
      };
    } 
    // Перевіряємо, чи містить повідомлення ключові слова для цін
    else if (priceKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        type: 'bot',
        text: t('chatbot.responses.price'),
        quickReplies: [
          { text: t('chatbot.quick_replies.order'), value: t('chatbot.quick_replies.order_value') },
          { text: t('chatbot.quick_replies.contacts'), value: t('chatbot.quick_replies.contacts_value') }
        ]
      };
    } 
    // Перевіряємо, чи містить повідомлення ключові слова для контактів
    else if (contactKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        type: 'bot',
        text: t('chatbot.responses.contact'),
        quickReplies: [
          { text: t('chatbot.quick_replies.order'), value: t('chatbot.quick_replies.order_value') },
          { text: t('chatbot.quick_replies.prices'), value: t('chatbot.quick_replies.prices_value') }
        ]
      };
    } 
    // Стандартна відповідь на всі інші повідомлення
    else {
      return {
        type: 'bot',
        text: t('chatbot.responses.default'),
        quickReplies: [
          { text: t('chatbot.quick_replies.order'), value: t('chatbot.quick_replies.order_value') },
          { text: t('chatbot.quick_replies.prices'), value: t('chatbot.quick_replies.prices_value') },
          { text: t('chatbot.quick_replies.contacts'), value: t('chatbot.quick_replies.contacts_value') }
        ]
      };
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.chatbotContainer}>
          <div className={styles.chatbotHeader}>
            <div className={styles.chatbotAvatar}>
              <FaRobot />
            </div>
            <div className={styles.chatbotInfo}>
              <h4>{t('chatbot.header_title')}</h4>
              <p>{t('chatbot.status')}</p>
            </div>
            <button className={styles.chatbotClose} onClick={toggleChat} aria-label={t('chatbot.close_chat')}>
              <FaTimes />
            </button>
          </div>
          
          <div className={styles.chatbotMessages}>
            {messages.map((message, index) => (
              <div key={index} className={`${styles.message} ${message.type === 'bot' ? styles.botMessage : styles.userMessage}`}>
                {message.type === 'bot' && (
                  <div className={styles.messageAvatar}>
                    <FaRobot />
                  </div>
                )}
                <div className={styles.messageContent}>
                  <p>{message.text}</p>
                  {message.quickReplies && (
                    <div className={styles.quickReplies}>
                      {message.quickReplies.map((reply, replyIndex) => (
                        <button 
                          key={replyIndex} 
                          type="button" 
                          className={styles.quickReply}
                          onClick={() => handleQuickReply(reply.value)}
                        >
                          {reply.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className={styles.chatbotInput}>
            <input 
              type="text" 
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chatbot.input_placeholder')} 
              aria-label={t('chatbot.message_label')}
            />
            <button 
              type="button" 
              onClick={handleSendMessage} 
              aria-label={t('chatbot.send_button')}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
      
      <button 
        className={styles.chatbotToggle} 
        onClick={toggleChat} 
        aria-label={t('chatbot.open_chat')}
      >
        <FaCommentDots />
      </button>
    </>
  );
}
