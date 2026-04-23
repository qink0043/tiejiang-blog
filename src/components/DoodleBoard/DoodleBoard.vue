<template>
  <div class="border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
    <!-- Toolbar -->
    <div class="flex items-center gap-3 px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
      <label class="flex items-center gap-1.5 text-xs text-slate-500">
        颜色
        <input
          type="color"
          v-model="color"
          class="w-7 h-7 rounded cursor-pointer border-0"
        />
      </label>
      <label class="flex items-center gap-1.5 text-xs text-slate-500">
        粗细
        <input
          type="range"
          v-model.number="lineWidth"
          min="1"
          max="20"
          class="w-20"
        />
      </label>
      <button
        @click="clearCanvas"
        class="ml-auto px-3 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
      >
        清除
      </button>
    </div>
    <!-- Canvas -->
    <canvas
      ref="canvasRef"
      @mousedown="startDraw"
      @mousemove="draw"
      @mouseup="stopDraw"
      @mouseleave="stopDraw"
      @touchstart.prevent="startDrawTouch"
      @touchmove.prevent="drawTouch"
      @touchend="stopDraw"
      class="w-full cursor-crosshair touch-none"
      :style="{ height: canvasHeight + 'px' }"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const canvasRef = ref<HTMLCanvasElement>()
const color = ref('#000000')
const lineWidth = ref(3)
const drawing = ref(false)
const canvasHeight = 300

let ctx: CanvasRenderingContext2D | null = null

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * window.devicePixelRatio
  canvas.height = canvasHeight * window.devicePixelRatio
  ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  fillWhite()
}

const fillWhite = () => {
  if (!ctx || !canvasRef.value) return
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)
}

const getPos = (e: MouseEvent) => {
  const canvas = canvasRef.value!
  const rect = canvas.getBoundingClientRect()
  return { x: e.clientX - rect.left, y: e.clientY - rect.top }
}

const getTouchPos = (e: TouchEvent) => {
  const canvas = canvasRef.value!
  const rect = canvas.getBoundingClientRect()
  const touch = e.touches[0]
  return { x: touch.clientX - rect.left, y: touch.clientY - rect.top }
}

const startDraw = (e: MouseEvent) => {
  drawing.value = true
  const pos = getPos(e)
  ctx!.beginPath()
  ctx!.moveTo(pos.x, pos.y)
}

const draw = (e: MouseEvent) => {
  if (!drawing.value || !ctx) return
  const pos = getPos(e)
  ctx.strokeStyle = color.value
  ctx.lineWidth = lineWidth.value
  ctx.lineTo(pos.x, pos.y)
  ctx.stroke()
}

const stopDraw = () => {
  if (!drawing.value) return
  drawing.value = false
  emitCanvas()
}

const startDrawTouch = (e: TouchEvent) => {
  drawing.value = true
  const pos = getTouchPos(e)
  ctx!.beginPath()
  ctx!.moveTo(pos.x, pos.y)
}

const drawTouch = (e: TouchEvent) => {
  if (!drawing.value || !ctx) return
  const pos = getTouchPos(e)
  ctx.strokeStyle = color.value
  ctx.lineWidth = lineWidth.value
  ctx.lineTo(pos.x, pos.y)
  ctx.stroke()
}

const clearCanvas = () => {
  if (!ctx || !canvasRef.value) return
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  fillWhite()
  emitCanvas()
}

const emitCanvas = () => {
  if (!canvasRef.value) return
  emit('update:modelValue', canvasRef.value.toDataURL('image/png'))
}

onMounted(() => {
  initCanvas()
  window.addEventListener('resize', initCanvas)
})

onUnmounted(() => {
  window.removeEventListener('resize', initCanvas)
})

defineExpose({ clearCanvas })
</script>
