import type { ChangeEvent } from 'react';
import { useEffect, useId, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
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
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    if (!value) {
      setUrlInput('');
      return;
    }

    if (value.startsWith('blob:')) {
      setUrlInput('');
      return;
    }

    setUrlInput(value);
  }, [value]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };

    reader.readAsDataURL(file);
    event.currentTarget.value = '';
  };

  const handleApplyUrl = () => {
    const nextUrl = urlInput.trim();

    onChange(nextUrl || null);
  };

  const handleClear = () => {
    onChange(null);
  };

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={inputId} className="dark:text-slate-200">{label}</Label>
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{hint}</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div
          className={cn(
            'flex aspect-square w-full max-w-[156px] items-center justify-center overflow-hidden rounded-[28px] border border-dashed border-gray-200 bg-gray-50 text-center text-xs leading-5 text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400',
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
            className="inline-flex h-11 cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
          >
            Tải ảnh
          </label>
          <Button variant="ghost" onClick={handleClear} disabled={!value}>
            Xóa
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <Input value={urlInput} placeholder="Dán URL ảnh vào đây" onChange={(event) => setUrlInput(event.target.value)} />
        <Button variant="outline" onClick={handleApplyUrl} disabled={!urlInput.trim()}>
          Dùng URL
        </Button>
      </div>
    </div>
  );
}
