'use client'

import Container from "@/components/container/content-wrapper.container";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <Container title="Home Page">
      <button onClick={() => toast.error('Hello my fritn')}>Toast</button>
    </Container>
  );
}
