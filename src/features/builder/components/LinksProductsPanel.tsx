import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Switch } from '../../../components/ui/switch';
import { cn } from '../../../lib/cn';
import type { BuilderItem, BuilderProductItem } from '../types';
import { useBuilderStore } from '../store/useBuilderStore';
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
        'rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm transition',
        isDragging && 'border-rose-200 shadow-md shadow-rose-100/70',
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 cursor-grab items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-lg text-slate-500"
            aria-label={`Drag ${item.title}`}
            {...attributes}
            {...listeners}
          >
            ⋮⋮
          </button>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-900">{item.type === 'product' ? 'Product card' : 'Link card'}</p>
              <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-600">
                {item.type}
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-500">Drag to reorder in the final profile stack.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Visible</span>
            <Switch checked={item.enabled} onCheckedChange={(checked) => updateLink(item.id, { enabled: checked })} />
          </div>
          <Button variant="ghost" size="sm" onClick={() => removeLink(item.id)}>
            Remove
          </Button>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {isProductItem(item) ? <ProductCardInput item={item} /> : <LinkCardInput item={item} />}
      </div>
    </div>
  );
}

function LinkCardInput({ item }: { item: BuilderItem }) {
  const updateLink = useBuilderStore((state) => state.updateLink);

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <label htmlFor={`title-${item.id}`} className="text-sm font-medium text-slate-700">
          Link Title
        </label>
        <Input
          id={`title-${item.id}`}
          value={item.title}
          placeholder="Shop my latest picks"
          onChange={(event) => updateLink(item.id, { title: event.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor={`url-${item.id}`} className="text-sm font-medium text-slate-700">
          URL
        </label>
        <Input
          id={`url-${item.id}`}
          value={item.url}
          placeholder="https://"
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
        <label htmlFor={`product-title-${item.id}`} className="text-sm font-medium text-slate-700">
          Product Title
        </label>
        <Input
          id={`product-title-${item.id}`}
          value={item.title}
          placeholder="Lip tint spotlight"
          onChange={(event) => updateLink(item.id, { title: event.target.value })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor={`vendor-${item.id}`} className="text-sm font-medium text-slate-700">
            Vendor
          </label>
          <Input
            id={`vendor-${item.id}`}
            value={item.vendor}
            placeholder="JULIDO"
            onChange={(event) => updateLink(item.id, { vendor: event.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor={`code-${item.id}`} className="text-sm font-medium text-slate-700">
            Code
          </label>
          <Input
            id={`code-${item.id}`}
            value={item.code}
            placeholder="123"
            onChange={(event) => updateLink(item.id, { code: event.target.value })}
          />
        </div>
      </div>

      <ImageUploadField
        label="Product Image"
        hint="Preview swaps instantly with a local object URL before any upload pipeline exists."
        value={item.image}
        onChange={(value) => updateLink(item.id, { image: value })}
        placeholder="Product image"
        imageClassName="rounded-[24px]"
      />

      <div className="space-y-2">
        <label htmlFor={`product-url-${item.id}`} className="text-sm font-medium text-slate-700">
          Product URL
        </label>
        <Input
          id={`product-url-${item.id}`}
          value={item.url}
          placeholder="https://"
          onChange={(event) => updateLink(item.id, { url: event.target.value })}
        />
      </div>
    </div>
  );
}

export function LinksProductsPanel() {
  const links = useBuilderStore((state) => state.profileData.links);
  const addLink = useBuilderStore((state) => state.addLink);
  const reorderLinks = useBuilderStore((state) => state.reorderLinks);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

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

  return (
    <BuilderPanelSection
      eyebrow="Links & Products"
      title="Stack, edit, and reorder blocks"
      description="Use the drag handle to reorder the public profile. Product blocks include vendor, code, image, and destination URL."
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => addLink('link')}>+ Add link</Button>
          <Button variant="outline" onClick={() => addLink('product')}>
            + Add product
          </Button>
        </div>

        {links.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-gray-200 bg-gray-50 p-8 text-center text-sm text-slate-500">
            No blocks yet. Add a link or product to start composing the stack.
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
}
