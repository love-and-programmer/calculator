<template>
  <div class="ticket-war-wrapper"></div>
</template>
<script>
export default {
  name: 'TicketWar',
  props: {
    karmarList: {
      type: Array,
      value: [],
    },
  },
  data() {
    return {
      ticketTopic: [
        {
          theme: '喜劇大師',
          decision: 9.56,
          creativity: 10.28,
          affinity: 11.33,
          execution: 12,
        },
        {
          theme: '公路冒險',
          decision: 10.28,
          creativity: 9.56,
          affinity: 12,
          execution: 11.33,
        },
        {
          theme: '懸念時刻',
          decision: 9.56,
          creativity: 11.33,
          affinity: 10.28,
          execution: 12,
        },
        {
          theme: '驚悚記',
          decision: 10.28,
          creativity: 11.33,
          affinity: 12,
          execution: 9.56,
        },
        {
          theme: '戰爭年代',
          decision: 9.56,
          creativity: 12,
          affinity: 10.28,
          execution: 11.33,
        },
        {
          theme: '西部邊境',
          decision: 10.28,
          creativity: 12,
          affinity: 11.33,
          execution: 9.56,
        },
        {
          theme: '愛情的味道',
          decision: 11.33,
          creativity: 10.28,
          affinity: 9.56,
          execution: 12,
        },
        {
          theme: '恐怖日記',
          decision: 11.33,
          creativity: 9.56,
          affinity: 12,
          execution: 10.28,
        },
        {
          theme: '悲慘人生',
          decision: 12,
          creativity: 11.33,
          affinity: 10.28,
          execution: 9.56,
        },
        {
          theme: '科幻契約',
          decision: 12,
          creativity: 9.56,
          affinity: 11.33,
          execution: 10.28,
        },
      ],
      startDate: '2019-12-30T05:00:00+08:00', // 白起, 4星, 驚悚記 週日
      startCharacter: 'Bai',
      startStar: 4,
      startTheme: 3, // 驚悚記
    }
  },
}
</script>
