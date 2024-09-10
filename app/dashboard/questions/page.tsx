// /pages/qcm.tsx
"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';

type Question = {
  id: number;
  question: string;
  choices: { id: number; text: string }[];
};

type Response = {
  questionId: number;
  selectedAnswer: string;
};

export default function QCM() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);

  useEffect(() => {
    // Récupérer les questions depuis l'API
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAnswerChange = (questionId: number, selectedAnswer: string) => {
    setResponses((prev) => {
      const existingResponse = prev.find((r) => r.questionId === questionId);
      if (existingResponse) {
        return prev.map((r) =>
          r.questionId === questionId ? { ...r, selectedAnswer } : r
        );
      } else {
        return [...prev, { questionId, selectedAnswer }];
      }
    });
  };

  const handleSubmit = async () => {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ responses }),
    });

    if (response.ok) {
      alert('Réponses soumises avec succès !');
    } else {
      alert('Erreur lors de la soumission des réponses.');
    }
  };

  return (
    <div>
      <h1 className='mb-6'>Questionnaire QCM</h1>
      {questions.map((question) => (
        <Card className='mb-6' key={question.id}>
          <h2 className='mb-4 ml-8'>{question.question}</h2>
          {question.choices.map((choice) => (
            <label className='px-4 text-3xl' key={choice.id}>
              <input className='ml-5'
                type="radio"
                name={`question-${question.id}`}
                value={choice.text}
                onChange={() => handleAnswerChange(question.id, choice.text)}
              />
            {" "}{choice.text}
            </label>
          ))}
        </Card>
      ))}
      <Button className='bg-red-500' onClick={handleSubmit}>Soumettre les réponses</Button>
    </div>
  );
}
