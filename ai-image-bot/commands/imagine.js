const {
  SlashCommandBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const { generateImage } = require("../src/generateImage");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ChipsGénerate")
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("La description de l'image")
        .setRequired(true)
    )
    .setDescription("Imagine an image!"),
  async execute(interaction) {
    const prompt = interaction.isButton()
      ? interaction.customId
      : interaction.options.getString("prompt");

    await interaction.deferReply();

    const { file } = await generateImage(interaction.id, prompt);

    await interaction.editReply({
      embeds: [
        {
          title: prompt,
          image: {
            url: "attachment://image.jpg",
          },
        },
      ],
      files: [new AttachmentBuilder(file, "image.jpg")],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(prompt)
            .setLabel("Try again!")
            .setStyle(ButtonStyle.Primary)
        ),
      ],
    });
  },
};
