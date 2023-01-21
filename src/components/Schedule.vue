<template>
  <table class="schedule-table">
    <tr>
      <th></th>
      <th>Фаджр</th>
      <th>Рассвет</th>
      <th>Зухр</th>
      <th>Аср</th>
      <th>Магриб</th>
      <th>Иша</th>
    </tr>
    <tr v-for="item in scheduleForMonth" :key="item.day">
      <td>{{ item.day }}</td>
      <td>{{ item.fajr }}</td>
      <td>{{ item.sunset }}</td>
      <td>{{ item.zuhr }}</td>
      <td>{{ item.asr }}</td>
      <td>{{ item.maghrib }}</td>
      <td>{{ item.isha }}</td>
    </tr>
  </table>
</template>

<script setup>
import { useSchedule } from '../composables/useSchedule.ts'

const { scheduleForMonth} = useSchedule()
</script>

<style lang="scss">
.schedule {
  max-height: 600px;
  overflow-y: auto;

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
}

.schedule-table {
  margin: 0 14px 16px;
  width: calc(100% - 28px);
  font-size: 12px;
  font-weight: 500;
  border-collapse: collapse;
  table-layout: fixed;

  th, td {
    padding: 6px;
    text-align: center;
    &:first-child {
      width: 16px;
    }
  }

  th {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  td {
    border-top: 2px solid #ebebeb;

    &:first-child {
      font-weight: 700;
      text-align: right;
    }
  }

  tr:nth-child(2) {
    td {
      border-top: none;
    }
  }
}
</style>