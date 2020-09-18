import { AggregateService } from './aggregate-service';
import { CatalogService } from './catalog-service';
import { ProjectService } from './project-service';
import { RecordService } from './record-service';
export * from './execute-sql';

const aggregateService = new AggregateService();
const catalogService = new CatalogService();
const projectService = new ProjectService();
const recordService = new RecordService();

export { aggregateService, catalogService, projectService, recordService };
