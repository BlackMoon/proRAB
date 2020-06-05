import { CatalogService } from './catalog-service';
import { RecordService } from './record-service';
export * from './execute-sql';

const catalogService = new CatalogService();
const recordService = new RecordService(null);

export { catalogService, recordService };
