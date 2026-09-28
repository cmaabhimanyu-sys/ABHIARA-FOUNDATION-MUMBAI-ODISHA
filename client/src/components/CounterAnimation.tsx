interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export default function CounterAnimation({ end, suffix = "", prefix = "" }: CounterProps) {
  return (
    <span>
      {prefix}{end}{suffix}
    </span>
  );
}
