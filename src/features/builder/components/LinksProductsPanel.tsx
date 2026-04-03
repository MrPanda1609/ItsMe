import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { memo } from 'react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Switch } from '../../../components/ui/switch';
import { cn } from '../../../lib/cn';
import type { BuilderItem, BuilderProductItem } from '../types';
import { builderSelectors, useBuilderStore } from '../store/useBuilderStore';
import { BuilderPanelSection } from './BuilderPanelSection';
import { ImageUploadField } from './ImageUploadField';

const isProductItem = (item: BuilderItem): item is BuilderProductItem => item.type === 'product';

function SortableBuilderItemCard({ item }: { item: BuilderItem }) {
  const updateLink = useBuilderStore((state) => state.updateLink);
  const removeLink = useBuilderStore((state) => state.removeLink);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm transition dark:border-white/10 dark:bg-[#111111]',
        isDragging && 'border-rose-200 shadow-md shadow-rose-100/70 dark:border-rose-400/30 dark:shadow-none',
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 cursor-grab items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-lg text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
            aria-label={`Kéo ${item.title}`}
            {...attributes}
            {...listeners}
          >
            ⋮⋮
          </button>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.type === 'product' ? 'Thẻ sản phẩm' : 'Thẻ liên kết'}</p>
              <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                {item.type === 'product' ? 'Sản phẩm' : 'Liên kết'}
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Kéo để đổi thứ tự hiển thị trong profile cuối cùng.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Hiển thị</span>
            <Switch checked={item.enabled} onCheckedChange={(checked) => updateLink(item.id, { enabled: checked })} />
          </div>
          <Button variant="ghost" size="sm" className="dark:text-rose-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-200" onClick={() => removeLink(item.id)}>
            Xóa
          </Button>
        </div>
      </div>

      <div className="mt-5 space-y-4">{isProductItem(item) ? <ProductCardInput item={item} /> : <LinkCardInput item={item} />}</div>
    </div>
  );
}

function LinkCardInput({ item }: { item: BuilderItem }) {
  const updateLink = useBuilderStore((state) => state.updateLink);

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <label htmlFor={`title-${item.id}`} className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Tiêu đề link
        </label>
        <Input
          id={`title-${item.id}`}
          value={item.title}
          placeholder="Ví dụ: Đặt lịch hợp tác"
          className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
          onChange={(event) => updateLink(item.id, { title: event.target.value })}
        />
      </div>

      <ImageUploadField
        label="Ảnh thumbnail"
        hint="Tuỳ chọn. Nếu không có ảnh, hệ thống sẽ dùng chấm màu nhấn để giữ bố cục gọn gàng."
        value={item.type === 'link' ? item.thumbnail : null}
        onChange={(value) => updateLink(item.id, { thumbnail: value })}
        placeholder="Thumbnail link"
        imageClassName="rounded-[20px]"
      />

      <div className="space-y-2">
        <label htmlFor={`url-${item.id}`} className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Đường dẫn
        </label>
        <Input
          id={`url-${item.id}`}
          value={item.url}
          placeholder="https://"
          className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
          onChange={(event) => updateLink(item.id, { url: event.target.value })}
        />
      </div>
    </div>
  );
}

function ProductCardInput({ item }: { item: BuilderProductItem }) {
  const updateLink = useBuilderStore((state) => state.updateLink);

  return (
      <div className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor={`product-title-${item.id}`} className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Tên sản phẩm
        </label>
        <Input
          id={`product-title-${item.id}`}
          value={item.title}
          placeholder="Ví dụ: Xe máy điện VinFast Feliz 2025"
          className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
          onChange={(event) => updateLink(item.id, { title: event.target.value })}
        />
      </div>

      <ImageUploadField
        label="Ảnh sản phẩm"
        hint="Ảnh đổi ngay trong preview để bạn canh layout nhanh hơn."
        value={item.image}
        onChange={(value) => updateLink(item.id, { image: value })}
        placeholder="Ảnh sản phẩm"
        imageClassName="rounded-[24px]"
      />

      <div className="space-y-2">
        <label htmlFor={`product-url-${item.id}`} className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Link sản phẩm
        </label>
        <Input
          id={`product-url-${item.id}`}
          value={item.url}
          placeholder="https://"
          className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
          onChange={(event) => updateLink(item.id, { url: event.target.value })}
        />
      </div>
    </div>
  );
}

export const LinksProductsPanel = memo(function LinksProductsPanel() {
  const links = useBuilderStore((state) => state.profileData.links);
  const productCount = useBuilderStore(builderSelectors.productCount);
  const hasProAccess = useBuilderStore(builderSelectors.hasProAccess);
  const canAddMoreProducts = useBuilderStore(builderSelectors.canAddMoreProducts);
  const addLink = useBuilderStore((state) => state.addLink);
  const reorderLinks = useBuilderStore((state) => state.reorderLinks);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const [productLimitNotice, setProductLimitNotice] = useState('');

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const startIndex = links.findIndex((item) => item.id === active.id);
    const endIndex = links.findIndex((item) => item.id === over.id);

    if (startIndex >= 0 && endIndex >= 0) {
      reorderLinks(startIndex, endIndex);
    }
  };

  const handleAddProduct = () => {
    if (!hasProAccess && productCount >= 3) {
      setProductLimitNotice('Bản Free chỉ cho tối đa 3 sản phẩm. Bạn không thể thêm sản phẩm thứ 4.');
      return;
    }

    setProductLimitNotice('');
    addLink('product');
  };

  return (
    <BuilderPanelSection
      eyebrow="Nội dung"
      title="Sắp xếp, chỉnh sửa và thêm khối"
      description="Thêm link hoặc sản phẩm, thay ảnh, chỉnh chữ và kéo thả thứ tự để dựng profile theo ý bạn."
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-3">
          <Button className="bg-rose-500 text-white hover:bg-rose-400 dark:border-transparent dark:bg-rose-500 dark:text-white dark:hover:bg-rose-400" onClick={() => addLink('link')}>
            + Thêm link
          </Button>
          <Button
            variant="outline"
            className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            onClick={handleAddProduct}
          >
            + Thêm sản phẩm
          </Button>
        </div>

        {productLimitNotice ? (
          <div className="rounded-[24px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
            {productLimitNotice}
          </div>
        ) : null}

        <div className="rounded-[24px] border border-gray-200 bg-gray-50 px-4 py-3 text-xs leading-6 text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
          {hasProAccess
            ? 'Pro có thể thêm sản phẩm không giới hạn.'
            : productCount > 3
              ? `Bạn đang thử Pro với ${productCount} sản phẩm. Free chỉ lưu tối đa 3 sản phẩm khi cập nhật public.`
              : `Free chỉ thêm tối đa ${3} sản phẩm khi cập nhật public. Hiện tại bạn đang dùng ${productCount}/${3}. Muốn thêm nhiều hơn hãy nâng cấp Pro.`}
        </div>

        {links.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
            Chưa có khối nào. Hãy thêm link hoặc sản phẩm để bắt đầu dựng stack.
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={links.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {links.map((item) => (
                  <SortableBuilderItemCard key={item.id} item={item} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </BuilderPanelSection>
  );
});
