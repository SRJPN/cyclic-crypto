basePairs = [[8, 0], [2, 4], [4, 2], [7, 2], [9, 4], [5, 4]]

baseInversePairs = [[8, 0], [2, 7], [4, 9], [7, 9], [9, 7], [5, 7]]


def modInverse(a, m):
    a = a % m
    for index in range(0, m):
        if (a * index) % m == 1:
            return index
    return 1


def mode(number, m):
    if number < 0:
        number = m - abs(number) % m
    return number % m


def modeEleven(n):
    return mode(n, 11)


def xFunction(x1, y1, x2, y2):
    x1x2 = x1 * x2
    y1y2 = y1 * y2
    y1x2 = y1 * x2
    x1y2 = x1 * y2

    X = x1x2 - y1y2
    Y = y1x2 + x1y2
    return [
        modeEleven(modeEleven(X) * modInverse(3, 11)),
        modeEleven(modeEleven(Y) * modInverse(3, 11)),
    ]


def encrypt(x1, y1, index):
    base = basePairs[index % (basePairs.__len__() - 1)]
    return xFunction(x1, y1, base[0], base[1])


def decrypt(x1, y1, index):
    base = baseInversePairs[(index % (baseInversePairs.__len__() - 1))]
    return xFunction(x1, y1, base[0], base[1])


def convertToAscii(text):
    return ([list(str(ord(letter))) for letter in text])


text = input("enter your message: ")

print("Text to be encrypted: " + text)

text_in_acsii = [[int(character_code[0]), int(character_code[1])]
                 for character_code in convertToAscii(text)]

print("Text in ascii: %s" % text_in_acsii)

encrypted_acsii = [encrypt(character_code[0], character_code[1], index)
                   for index, character_code in enumerate(text_in_acsii)]

print("Text in encrypted ascii: %s" % encrypted_acsii)

decrypted_ascii = [decrypt(character_code[0], character_code[1], index)
                   for index, character_code in enumerate(encrypted_acsii)]

print("Text in decrypted ascii: %s" % (decrypted_ascii))

retrieved_text = [chr(int(str(character_code[0]) + str(character_code[1])))
                  for character_code in decrypted_ascii]

print("Text retrieved: " + "".join(retrieved_text))
