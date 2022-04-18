import "reflect-metadata";
import { inject, injectable, container, singleton } from "tsyringe";
import { createMock } from "ts-auto-mock";
import { method, On } from "ts-auto-mock/extension";

interface Logger {
  info(message: string): void;
}

class LoggerImp implements Logger {
  constructor() {
    console.log("constructor is called");
  }

  info(message: string): void {
    console.log("message");
  }
}

@injectable()
class HttpClient {
  constructor(@inject("Logger") private logger: Logger) {}

  public send(data: string): string {
    this.logger.info(`${data} is sending...`);
    return data.split("").reverse().join("");
  }
}

@injectable()
class MyService {
  constructor(
    private http: HttpClient,
    @inject("Logger") private log: Logger
  ) {}

  public process(message: string): void {
    const response = this.http.send(message);

    console.log(`response: ${response}`);
  }
}

describe("tsyringe-parent", () => {
  it("tsyringe-child", () => {
    const mockLogger = createMock<Logger>();
    const mockInfo = On(mockLogger).get(method((mock) => mock.info));
    mockInfo.mockImplementation((message) => {
      console.info(`[Test Logger]: ${message}`);
    });

    //container.register("Logger", { useValue: Lo });
    //container.register("Logger", { useSingleton: LoggerImp });
    container.registerSingleton("Logger", LoggerImp);

    //container.register("HttpClient", { useClass: HttpClient });

    const myService = container.resolve(MyService);
    myService.process("seungmin.ha");

    const myService2 = container.resolve(MyService);
    myService.process("seungmin.ha");
  });
});
