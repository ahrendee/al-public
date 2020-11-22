declare var process: Process;

interface Process {
  env: Env;
}

interface Env {
  API_USERNAME: string;
  API_PASSWORD: string;
}

interface GlobalEnvironment {
  process: Process
}
