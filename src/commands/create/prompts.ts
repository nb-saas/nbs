import prompts from "prompts";

export const toPrompts = async () => {
  const response = await prompts([
    {
      type: "select",
      name: "appType",
      message: "项目类型",
      choices: [
        { title: "微应用", value: "micro-app" },
        { title: "主应用", value: "main-app" },
      ],
    },
    {
      type: "text",
      name: "name",
      initial: "nbs-project",
      message: "项目名称",
    },
  ]);

  return response;
};
