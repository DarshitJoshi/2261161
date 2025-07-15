export interface LogOptions {
  stack: "backend" | "frontend";
  level: "debug" | "info" | "warn" | "error" | "fatal";
  package:
    | "cache" | "controller" | "cron_job" | "db" | "domain" | "handler" | "repository"
    | "route" | "service"
    | "api" | "component" | "hook" | "page" | "state" | "style"
    | "auth" | "config" | "middleware" | "utils";
  message: string;
  token: string; // Bearer token you got during auth
}

export async function log({ stack, level, package: pkg, message, token }: LogOptions): Promise<void> {
  const payload = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Use the protected API
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to log:", data);
    } else {
      console.info("Logged successfully:", data.message);
    }
  } catch (err) {
    console.error("Logging error:", err);
  }
}
