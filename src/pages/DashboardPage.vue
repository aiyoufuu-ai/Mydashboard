<script setup>
import { useRouter } from 'vue-router'
import { inject } from 'vue'
import ScheduleCard from '../components/ScheduleCard.vue'
import RoutineCard from '../components/RoutineCard.vue'
import TaskCard from '../components/TaskCard.vue'
import CreditSummaryCard from '../components/CreditSummaryCard.vue'
import BudgetCard from '../components/BudgetCard.vue'

const router = useRouter()
const openSettings = inject('openSettings')
</script>

<template>
  <div class="dashboard-header">
    <h1>ダッシュボード</h1>
    <button class="btn btn-danger" style="font-size: 13px;" @click="openSettings">
      API設定
    </button>
  </div>

  <div class="dashboard-grid">
    <!-- 主要グループ: 1カラム時はこちらが上に来る -->
    <div class="dash-col">
      <CreditSummaryCard>
        <template #action>
          <button class="btn btn-primary btn-head" @click="router.push('/credit')">
            履歴詳細 →
          </button>
        </template>
      </CreditSummaryCard>
      <ScheduleCard />
      <BudgetCard />
    </div>

    <!-- 下段グループ: 1カラム時は主要グループの下に続く -->
    <div class="dash-col">
      <div class="card">
        <button class="btn btn-primary" style="width: 100%;" @click="router.push('/fridge')">
          冷蔵庫を見る →
        </button>
      </div>
      <TaskCard />
      <RoutineCard />
    </div>
  </div>
</template>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dashboard-header h1 {
  font-size: 24px;
}

/* 利用状況カードの見出し横に収める小さめのボタン */
.btn-head {
  padding: 8px 14px;
  font-size: 13px;
  white-space: nowrap;
  flex-shrink: 0;
}

/*
 * 既定はスマホ・タブレット向けの1カラム。
 * 2つの .dash-col が縦に並ぶため、表示順はDOM順
 * (利用状況 → スケジュール → 予算 → 冷蔵庫 → タスク → ルーティン)そのままになる。
 * order指定やgrid-columnの個別指定は不要。
 */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: start;
}

/* 各グループ内のカードを縦積みにする */
.dash-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* gapと .card の margin-bottom が二重に効くのを防ぐ */
.dashboard-grid :deep(.card) {
  margin-bottom: 0;
}

/*
 * デスクトップのみ2カラム。グループ単位で左右に分けるので、
 * 右列が左列の高さに引きずられて上が空くことがない。
 */
@media (min-width: 1025px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
