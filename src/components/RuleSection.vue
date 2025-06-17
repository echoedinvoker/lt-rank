<template>
  <section class="w-full px-9 mt-38">
    <div class="bg-[#BD5310] px-[26px] py-[22px] rounded-xl max-w-[1098px] mx-auto relative">
      <div class="flex flex-col space-y-8 px-24 pt-24 pb-18 rounded bg-[#FBDCAB] font-noto-sans-tc text-[28px] relative"
        style="box-shadow: inset 0 0 0 16px rgba(77, 17, 17, 0.9)">
        <h2
          class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-black font-noto-sans-tc text-white grid grid-cols-[1fr_max-content_max-content_max-content_max-content_1fr] justify-center w-1/3 min-w-[350px] bg-gradient-to-b from-[#00C5C5] to-[#007187] border-[6px] border-[#007187] rounded-md px-8 py-4 gap-4">
          <div></div>
          <div>活</div>
          <div>動</div>
          <div>辦</div>
          <div>法</div>
          <div></div>
        </h2>

        <p>1. 本活動以6天為一週期，每週三中午11:59:59結算該週成績，每週活動時間如下：</p>

        <TextList class="!space-y-0" />

        <p>2. 每週成績結算後，將於每週四上午10:00:00更新成績於活動頁統一公告。</p>

        <p>
          3.
          校際戰績以「學校」為計算單位，採計每週活動期間產生的「任務紅利」累積加總，為總成績計算依據。
        </p>

        <TextList :contents="[
          '如：A高中當週累積總任務紅利為 9,999；B高中當週累積總任務紅利為 1,111；C高中當週累積總任務紅利為 6,666；D高中當週累積總任務紅利為 8,888，則當週前3名依序為：A高中、D高中、C高中。',
          '每週前3名的學校，該校的會員每帳號依序可獲得：1000點獎勵紅利、500點獎勵紅利、100點獎勵紅利。\n 獎勵紅利統一於活動下週三晚上23:59:59前歸戶完成，可至活動頁領取。\n 如：第2週獎勵紅利，統一於2025/07/30 (三) 晚上23:59:59前歸戶。',
        ]" />

        <p>
          6.
          當每一週開啟新的比賽時，成績皆以當週新獲得的「任務紅利」計算；過去週次比賽的「任務紅利」將不會列當週新的比賽成績。
        </p>

        <p>7. 其他注意事項：</p>

        <TextList :contents="[
          '參加本活動的「校際戰績」須在賽前填寫「基本資料」中的「學校名稱」，方可參賽計算成績。',
          '「基本資料」中的「學校名稱」若有進行設定變更，將於7天後才能再次設定變更。\n如：王小明於2025/07/10 (四) 上午10:00:00設定變更，下次可設定變更的時間為 2025/07/17 (四) 上午10:00:00。',
          '參加本活動的「校際戰績」須在賽前填寫「基本資料」中的「學校名稱」，方可參賽計算成績。\n「基本資料」中的「學校名稱」若有進行設定變更，將於7天後才能再次設定變更。\n如：王小明於2025/07/10 (四) 上午10:00:00設定變更，下次可設定變更的時間為 2025/07/17 (四) 上午10:00:00。\n活動期間內設定變更「學校名稱」者，則該週不予計算「校際戰績」，「個人戰績」仍可計算。\n如：王小明於2025/07/18 (五) 上午10:00:00 設定變更「學校名稱」，則第2週「校際戰績」不予列入該校戰績。唯「首次」設定學校名稱者不在此限。',
        ]" />

        <p>
          8. 活動紅利僅可兌換本平台相關服務，不得要求更換內容或轉售他人，或折換現金或其他等值商品。
        </p>

        <p>9. 本活動因故無法進行，主辦單位有權決定取消、終止、修改或暫停活動。</p>

        <p>10. 主辦單位保有任何修改本活動條款及細則之權益。</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TextList from '@/components/ui/list/TextList.vue'
</script>
