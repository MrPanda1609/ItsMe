import type { ChangeEvent } from 'react';
import { useEffect, useId, useRef } from 'react';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { cn } from '../../../lib/cn';

interface ImageUploadFieldProps {
  label: string;
  hint: string;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder: string;
  previewWrapperClassName?: string;
  imageClassName?: string;
}

export function ImageUploadField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  previewWrapperClassName,
  imageClassName,
}: ImageUploadFieldProps) {
  const inputId = useId();
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const nextObjectUrl = URL.createObjectURL(file);

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    objectUrlRef.current = nextObjectUrl;
    onChange(nextObjectUrl);
    event.currentTarget.value = '';
  };

  const handleClear = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    onChange(null);
  };

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={inputId}>{label}</Label>
        <p className="mt-1 text-xs leading-5 text-slate-500">{hint}</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div
          className={cn(
            'flex aspect-square w-full max-w-[156px] items-center justify-center overflow-hidden rounded-[28px] border border-dashed border-gray-200 bg-gray-50 text-center text-xs leading-5 text-slate-500',
            previewWrapperClassName,
          )}
        >
          {value ? (
            <img src={value} alt={label} className={cn('h-full w-full object-cover', imageClassName)} />
          ) : (
            <span className="px-4">{placeholder}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <input id={inputId} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <label
            htmlFor={inputId}
            className="inline-flex h-11 cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
          >
            Upload image
          </label>
          <Button variant="ghost" onClick={handleClear} disabled={!value}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
