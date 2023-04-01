declare namespace Mail {
  interface Data {
    to: string;
    from: stirng;
    subject: string;
    html?: string;
    template?: string;
    context?: Record<string, stirng>;
  }
}
