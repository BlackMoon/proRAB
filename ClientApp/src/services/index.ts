import { CatalogService } from './catalog-service';
import { ProjectService } from './project-service';
import { RecordService } from './record-service';
export * from './execute-sql';

const catalogService = new CatalogService();
const projectService = new ProjectService();
const recordService = new RecordService();

export { catalogService, projectService, recordService };
