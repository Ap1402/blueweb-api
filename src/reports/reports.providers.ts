import { ReportStatus } from './categories/reportCategory.model';
import { Report } from './report.model';
import { ReportCategory } from './statuses/reportStatus.model';

export const reportsProvider = [
  {
    provide: 'REPORTS_REPOSITORY',
    useValue: Report,
  },

  {
    provide: 'REPORTS_CATEGORY_REPOSITORY',
    useValue: ReportCategory,
  },

  {
    provide: 'REPORTS_STATUS_REPOSITORY',
    useValue: ReportStatus,
  },
];