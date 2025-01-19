<script lang="ts" setup>
import type { AnalysisOverviewItem } from '@vben/common-ui';
import type { TabOption } from '@vben/types';

import {
  AnalysisChartCard,
  AnalysisChartsTabs,
  AnalysisOverview,
} from '@vben/common-ui';
import {
  SvgBellIcon,
  SvgCakeIcon,
  SvgCardIcon,
  SvgDownloadIcon,
} from '@vben/icons';

import AnalyticsTrends from './analytics-trends.vue';
import AnalyticsVisitsData from './analytics-visits-data.vue';
import AnalyticsVisitsSales from './analytics-visits-sales.vue';
import AnalyticsVisitsSource from './analytics-visits-source.vue';
import AnalyticsVisits from './analytics-visits.vue';

const overviewItems: AnalysisOverviewItem[] = [
  {
    icon: SvgCardIcon,
    title: 'User volume',
    totalTitle: 'Total number of users',
    totalValue: 120_000,
    value: 2000,
  },
  {
    icon: SvgCakeIcon,
    title: 'Visits',
    totalTitle: 'Total visits',
    totalValue: 500_000,
    value: 20_000,
  },
  {
    icon: SvgDownloadIcon,
    title: 'Downloads',
    totalTitle: 'Total downloads',
    totalValue: 120_000,
    value: 8000,
  },
  {
    icon: SvgBellIcon,
    title: 'Usage',
    totalTitle: 'Total usage',
    totalValue: 50_000,
    value: 5000,
  },
];

const chartTabs: TabOption[] = [
  {
    label: 'traffic trend',
    value: 'trends',
  },
  {
    label: 'Monthly visits',
    value: 'visits',
  },
];
</script>

<template>
  <div class="p-5">
    <AnalysisOverview :items="overviewItems" />
    <AnalysisChartsTabs :tabs="chartTabs" class="mt-5">
      <template #trends>
        <AnalyticsTrends />
      </template>
      <template #visits>
        <AnalyticsVisits />
      </template>
    </AnalysisChartsTabs>

    <div class="mt-5 w-full md:flex">
      <AnalysisChartCard
        class="mt-5 md:mr-4 md:mt-0 md:w-1/3"
        title="Number of visits"
      >
        <AnalyticsVisitsData />
      </AnalysisChartCard>
      <AnalysisChartCard
        class="mt-5 md:mr-4 md:mt-0 md:w-1/3"
        title="Visit Source"
      >
        <AnalyticsVisitsSource />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:w-1/3" title="Visit Source">
        <AnalyticsVisitsSales />
      </AnalysisChartCard>
    </div>
  </div>
</template>
