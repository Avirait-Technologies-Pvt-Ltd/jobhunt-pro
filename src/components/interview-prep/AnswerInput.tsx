'use client';

import React, { useState, useEffect } from 'react';
import { Save, Star, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  countWords,
  isAnswerLengthValid,
  validateSTARStructure,
} from '@/lib/interview-utils';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSave?: (answer: string, rating?: 1 | 2 | 3 | 4 | 5) => void;
  onSubmit?: (answer: string, rating: 1 | 2 | 3 | 4 | 5) => void;
  showSTARHelper?: boolean;
  showWordCount?: boolean;
  minWords?: number;
  placeholder?: string;
  disabled?: boolean;
  questionCategory?: string;
}

export function AnswerInput({
  value,
  onChange,
  onSave,
  onSubmit,
  showSTARHelper = true,
  showWordCount = true,
  minWords = 50,
  placeholder = 'Type your answer here...',
  disabled = false,
  questionCategory,
}: AnswerInputProps) {
  const [selfRating, setSelfRating] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const wordCount = countWords(value);
  const lengthValidation = isAnswerLengthValid(value, minWords);
  const starValidation = validateSTARStructure(value);

  // Reset rating when answer changes significantly
  useEffect(() => {
    if (wordCount < 10) {
      setSelfRating(null);
    }
  }, [wordCount]);

  const handleSubmit = () => {
    if (onSubmit && selfRating) {
      onSubmit(value, selfRating);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(value, selfRating || undefined);
    }
  };

  const isBehavioralQuestion = questionCategory === 'behavioral' || questionCategory === 'situational';

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          Your Answer
          {showWordCount && (
            <Badge
              variant={lengthValidation.valid ? 'secondary' : 'outline'}
              className={!lengthValidation.valid && wordCount > 0 ? 'text-yellow-600' : ''}
            >
              {wordCount} words
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Answer Textarea */}
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[200px] resize-y"
        />

        {/* Word Count Feedback */}
        {showWordCount && wordCount > 0 && (
          <p className={`text-sm ${lengthValidation.valid ? 'text-muted-foreground' : 'text-yellow-600'}`}>
            {lengthValidation.message}
          </p>
        )}

        {/* STAR Method Helper */}
        {showSTARHelper && isBehavioralQuestion && wordCount > 20 && (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFeedback(!showFeedback)}
              className="text-sm"
            >
              {showFeedback ? 'Hide' : 'Show'} STAR Analysis
            </Button>

            {showFeedback && (
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center gap-1 ${
                      starValidation.hasSituation ? 'text-green-600' : 'text-muted-foreground'
                    }`}
                  >
                    <CheckCircle
                      className={`h-4 w-4 ${starValidation.hasSituation ? '' : 'opacity-30'}`}
                    />
                    <span className="text-sm font-medium">Situation</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      starValidation.hasTask ? 'text-green-600' : 'text-muted-foreground'
                    }`}
                  >
                    <CheckCircle
                      className={`h-4 w-4 ${starValidation.hasTask ? '' : 'opacity-30'}`}
                    />
                    <span className="text-sm font-medium">Task</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      starValidation.hasAction ? 'text-green-600' : 'text-muted-foreground'
                    }`}
                  >
                    <CheckCircle
                      className={`h-4 w-4 ${starValidation.hasAction ? '' : 'opacity-30'}`}
                    />
                    <span className="text-sm font-medium">Action</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      starValidation.hasResult ? 'text-green-600' : 'text-muted-foreground'
                    }`}
                  >
                    <CheckCircle
                      className={`h-4 w-4 ${starValidation.hasResult ? '' : 'opacity-30'}`}
                    />
                    <span className="text-sm font-medium">Result</span>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="font-medium mb-1">
                    STAR Score: {starValidation.score}/4
                  </p>
                  {starValidation.feedback.map((feedback, index) => (
                    <p key={index} className="text-muted-foreground">
                      • {feedback}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Self Rating */}
        {(onSubmit || onSave) && wordCount >= minWords && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Rate your answer
              <span className="text-muted-foreground font-normal ml-2">
                (How confident are you?)
              </span>
            </Label>
            <div className="flex items-center gap-2">
              {([1, 2, 3, 4, 5] as const).map((rating) => (
                <Button
                  key={rating}
                  variant={selfRating === rating ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelfRating(rating)}
                  className="w-10 h-10 p-0"
                >
                  <Star
                    className={`h-4 w-4 ${
                      selfRating && selfRating >= rating ? 'fill-current' : ''
                    }`}
                  />
                </Button>
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                {selfRating === 1 && 'Needs work'}
                {selfRating === 2 && 'Fair'}
                {selfRating === 3 && 'Good'}
                {selfRating === 4 && 'Very good'}
                {selfRating === 5 && 'Excellent'}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {onSave && (
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={disabled || wordCount < 10}
            >
              <Save className="mr-2 h-4 w-4" />
              Save to Answer Bank
            </Button>
          )}
          {onSubmit && (
            <Button
              onClick={handleSubmit}
              disabled={disabled || !selfRating || wordCount < minWords}
            >
              Submit Answer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
