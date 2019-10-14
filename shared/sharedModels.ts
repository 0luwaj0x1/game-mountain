// types shared between server and client (src)

export type Kit =
    | "TLJ"
    | "MTN"
    | "BOA"
    | "TFR"
    | "BMC"
    | "LTS"
    | "IAM"
    | "FDJ"
    | "KAT"
    | "TGA"
    | "EQS"
    | "BSE"
    | "ALM"
    | "AST"
    | "MOV"
    | "SKY"
    | "LAM"
    | "TCG"
    | "TTS"
    | "COF"
    | "EUC"
    | "OGE";

export type Player = {
    name: string;
    kit: Kit;
};
