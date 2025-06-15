<template>
  <div class="flex items-center">
<svg width="111" height="111" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M110.598 55.3911C110.598 85.6951 86.0362 110.257 55.7322 110.257C25.4282 110.257 0.866211 85.6875 0.866211 55.3911C0.866211 25.0947 25.4358 0.532715 55.7322 0.532715C86.0286 0.532715 110.598 25.0947 110.598 55.3987V55.3911Z" fill="url(#paint0_linear_4_3997)"/>
<g style="mix-blend-mode:multiply" opacity="0.3">
<path d="M104.482 58.1745C104.482 83.56 83.901 104.141 58.5231 104.141C33.1453 104.141 12.5486 83.56 12.5486 58.1745C12.5486 32.7889 33.13 12.2075 58.5231 12.2075C83.9163 12.2075 104.482 32.7889 104.482 58.1745Z" fill="#BABCBE"/>
</g>
<path d="M101.707 55.391C101.707 80.7842 81.1255 101.366 55.7399 101.366C30.3544 101.366 9.76538 80.7842 9.76538 55.391C9.76538 29.9979 30.3468 9.42407 55.7399 9.42407C81.1331 9.42407 101.707 30.0055 101.707 55.391Z" fill="#FFFFC9"/>
<path d="M73.5836 45.0433C73.5836 55.1396 65.4014 63.3218 55.3051 63.3218C45.2088 63.3218 37.0266 55.1396 37.0266 45.0433C37.0266 34.9471 45.2088 26.7725 55.3051 26.7725C65.4014 26.7725 73.5836 34.9547 73.5836 45.0433Z" fill="url(#paint1_linear_4_3997)"/>
<path d="M72.8974 60.4012C68.6118 65.3044 62.3283 68.4157 55.3052 68.4157C48.282 68.4157 41.9986 65.3044 37.7206 60.4012C29.9807 63.6344 23.8116 68.9266 20.3877 75.3702C28.0514 86.6865 41.0149 94.1291 55.7093 94.1291C70.4038 94.1291 82.8411 86.9763 90.5582 76.0412C87.2106 69.2926 80.889 63.7488 72.8898 60.3936L72.8974 60.4012Z" fill="url(#paint2_linear_4_3997)"/>
<defs>
<linearGradient id="paint0_linear_4_3997" x1="0.866211" y1="55.3987" x2="110.598" y2="55.3987" gradientUnits="userSpaceOnUse">
<stop stop-color="#F79532"/>
<stop offset="1" stop-color="#BB3B1E"/>
</linearGradient>
<linearGradient id="paint1_linear_4_3997" x1="46.5586" y1="27.779" x2="81.3922" y2="96.5236" gradientUnits="userSpaceOnUse">
<stop stop-color="#F7D332"/>
<stop offset="1" stop-color="#F5921E"/>
</linearGradient>
<linearGradient id="paint2_linear_4_3997" x1="34.3272" y1="33.971" x2="69.1608" y2="102.723" gradientUnits="userSpaceOnUse">
<stop stop-color="#F7D332"/>
<stop offset="1" stop-color="#F5921E"/>
</linearGradient>
</defs>
</svg>
  </div>
</template>

<script setup lang="ts">
// 可以添加 props 來控制 logo 大小
interface Props {
  height?: number
}

withDefaults(defineProps<Props>(), {
  height: 35,
})
</script>
