<template>
  <section class="schedule">
    <div class="section__title">{{ sectionTitle }}</div>
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
      <tr
          v-for="item in scheduleForMonth"
          :key="item.day"
          :class="item.day === new Date().getDate() ? 'schedule-table__today' : ''"
      >
        <td>{{ item.day }}</td>
        <td>{{ item.fajr }}</td>
        <td class="schedule-table__cell--secondary">{{ item.sunrise }}</td>
        <td>{{ item.zuhr }}</td>
        <td>{{ item.asr }}</td>
        <td>{{ item.maghrib }}</td>
        <td>{{ item.isha }}</td>
      </tr>
    </table>
  </section>
</template>

<script setup>
import { useSchedule } from '../../composables/useSchedule.js'

const { scheduleForMonth} = useSchedule()

const sectionTitle = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
][
  new Date().getMonth()
]
</script>

<style lang="scss">
.schedule {
  max-height: 100%;
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
    background-color: #ffffff;
  }

  td {
    border-top: 2px solid #ebebeb;

    &:first-child {
      font-weight: 700;
      text-align: right;
      font-feature-settings: "tnum" on, "lnum" on;
    }
  }

  tr {
    &:first-child {
      position: sticky;
      top: 42px;
    }

    &:nth-child(2) {
      td {
        border-top: none;
      }
    }
  }

  &__cell {
    &--secondary {
      color: #727088;
    }
  }

  &__today {
    td {
      background-color: #6200ee;
      color: #ffffff;
      border-top: none;

      &:first-child {
        border-radius: 5px 0 0 5px;
      }
      &:last-child {
        border-radius: 0 5px 5px 0;
      }
    }

    & + tr td {
      border-top: none;
    }
  }
}
</style>