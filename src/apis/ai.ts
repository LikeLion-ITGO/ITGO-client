import axiosAI from "./axiosAI";

export async function aiFreshness(files: File[]) {
  const form = new FormData();
  files.forEach((f) => form.append("files", f)); // 여러 장이면 여러 번 append

  console.log(form);

  const { data } = await axiosAI.post("/freshness", form);
  console.log(data);
  return data;
}
